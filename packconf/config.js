const _ = require('lodash');
const fs = require('fs');
const paths = require('path');
const HtmlSystemjsConfig = require('./html-systemjs-config');

const itemWebConfig = {
  go: paths.resolve(__dirname, 'webpackConfig.js'), // 我不曾存在过
  build: paths.resolve(__dirname, 'webpackConfig-build.js') // 我也不曾存在过
};

const CopyWebpackPlugin = require('copy-webpack-plugin'); // 把文件拷贝至dist的工具，DEV下默认copy不会拷贝，必须webpack -p才可以
/**
 * 拷贝的目录
 */
function Copy(path, build) {
  const _data = [];
  // 设置systemjs的编译输出路径
  const _pa = paths.resolve(path, `../dist${build ? '/min' : ''}/systemjs`);

  // 将systemJS打包配置写入webpack执行体
  if (!fs.existsSync(_pa)) {
    _data.push({ // systemJS写法
      context: 'node_modules/systemjs/dist',
      from: '*',
      to: 'systemjs'
    });
  }
  // 语言包打包配置写入执行体
  _data.push({
    context: `${path}/js/config/lang/data`,
    from: '**',
    to: 'lang'
  });

  return new CopyWebpackPlugin(_data);
}

/**
 * 最后配置
 */
function Last({ data, build, path, userConfig, packPath }) {
  // data: webpack的执行体
  // build: 是否全编【DEV & PRE】
  // path: 项目内容的路径，告知哪个项目现在开始监听
  // userConfig: 全局的gulp配置
  // packPath: 编译系统的路径
  // =============== 天杀的STM知道这些东西都是什么鬼 ============ //

  // 判断是否存在当前项目配置【emmmm....似乎一开始就不存在的】
  if (!build && fs.existsSync(itemWebConfig.go)) {
    return require(itemWebConfig.go);
  } else if (fs.existsSync(itemWebConfig.build)) {
    return require(itemWebConfig.build);
  }
  /**
   * 多项目情况-----------------------------------------
   * 可对部分项目不进行编译
   * */
  // const entry = {};
  // _.forEach([
  //     'main',
  //     'config'
  // ], (item) => entry[item] = data.entry[item]);
  // data.entry = entry;

  // 就是用来把module编上去，支持各个项目内本地安装module
  data.resolve.modules.unshift(paths.resolve(__dirname, '../node_modules'));
  // data.resolve.modules.push(...userConfig.modules)
  /**
   * ------------------------------------------------
   **/

  // data.externals[] = '';
  // 添加目录拷贝
  const _copyList = Copy(path, build);
  if (_copyList) {
    data.plugins.push(_copyList);
  }

  data.plugins.push(new HtmlSystemjsConfig());

  // data.externals['webModule-main'] = 'webModule-main';
  // data.externals['webModule-im'] = 'webModule-im';

  data.externals.echarts = 'echarts';
  data.externals.highlight = 'highlight';
  data.externals.highlightcss = 'highlightcss';
  // data.externals.classnames = 'classnames';
  // data.externals.Apiutil = 'Apiutil';

  // data.output.library = '[name]'; // 输出到全局的名称
  // data.output.libraryTarget = 'umd'; // 输出方式
  return data;
}

module.exports = Last;
