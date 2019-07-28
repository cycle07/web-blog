/**
 * 为html中生成 systemJSConfig 字段内容
 */
const _ = require('lodash');

module.exports = class {
  apply(compiler) {
    // console.log(compiler);
    compiler.plugin('compilation', function(compilation) { // compilation
      compilation.plugin('html-webpack-plugin-before-html-generation', function(
        htmlPluginData,
        callback
      ) { // 以上全是官方文档，不要纠结
        const systemJSConfig = {
          map: {},
          meta: {
            '*': {
              format: 'global'
            }
          }
        };
        // htmlPluginData.assets.chunks内文件打包出来的信息[大概长下面这样]
        // { size: 4683,
        // entry: './config.js',
        // hash: 'e4b68c641121350b9062',
        // css: [] }
        // { size: 206407,
        // entry: './main.js',
        // hash: 'f99f7702c9d034b1d828',
        // css: [ './main.css' ] }
        _.forEach(htmlPluginData.assets.chunks, (item, key) => {
          // 让system支持下划线+文件名读取
          const _key = `_${key}`;
          systemJSConfig.map[_key] = `${item.entry}?${item.hash}`;
          systemJSConfig.meta[_key] = {};
          systemJSConfig.meta[_key].depsCss = _.map(
            item.css,
            cssItem => `${cssItem}?${htmlPluginData.plugin.childCompilerHash}`
          );
        });
        htmlPluginData.plugin.options.systemJSConfig = systemJSConfig;
        if (_.isFunction(callback)) callback(null, htmlPluginData);
        return htmlPluginData;
      });
    });
  }
};
