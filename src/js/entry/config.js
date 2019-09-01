/* eslint guard-for-in: "off", quote-props: "off", dot-notation: "off" */
/**
 * systemjs加载配置
 */

import Systemjs from "systemjs";
import _cdnHost from "config/cdn-host";

const { SystemJSConfig, fedBuildDate } = window;

let cdnHost = _cdnHost;

if (__DEV__) {
  cdnHost = "http://localhost:8080/web-cdn/release";
}

const mapListObj = {
  // 自定义map和依赖关系,可覆盖cdn中的配置(注释的是例子
  map: {
    echarts: `${cdnHost}/js/echarts/4.1.0/echarts.min.js`,
    // 'icon-new': `${cdnHost}/icon/sort-pc-management-menu/1.0.0/iconfont.js` // 过度阶段，后期会更新到config中
    icon: "//at.alicdn.com/t/font_1337932_sx74yg2k24i.js"
    // isso: 'http://192.168.193.102:40404/js/embed.min.js'
  },
  meta: {
    // map的依赖关系
    // 'ReactDom': {
    //     deps: ['React']
    // }
  }
};

const mainListObj = {
  // 载入文件的配置
  _main: {
    // 入口文件 签名
    ToLoad: true, // 是否马上加载
    // 依赖库
    deps: ["react", "react-router-dom", "mobx", "mobx-react", "echarts", "icon"]
  }
};
for (const key in SystemJSConfig.meta) {
  const itme = SystemJSConfig.meta[key];
  const _key = key;
  if (!mainListObj[_key]) {
    // 如果全局文件配置中没有config这里的依赖
    mainListObj[_key] = {
      // 就给依赖加上空deps
      deps: []
    };
  }
  if (!mainListObj[_key].deps) {
    // 如果全局配置中有config的依赖但没有设置deps,加之
    mainListObj[_key].deps = [];
  }
  if (itme.depsCss) {
    // 如果全局配置中有depsCss,config的也把它依赖上
    mainListObj[_key].deps = mainListObj[_key].deps.concat(itme.depsCss);
  }
}
Systemjs.import(`${cdnHost}/config/2.3.0/config.js?${fedBuildDate}`).then(
  res => {
    // console.log(res);
    // res中的map查看cdn目录下config.js文件
    Systemjs.config(res(cdnHost));
    Systemjs.config(mapListObj);
    Systemjs.config({
      meta: mainListObj
    });

    for (const key in mainListObj) {
      const item = mainListObj[key];
      if (item.ToLoad) {
        Systemjs.import(key);
      }
    }
  }
);
