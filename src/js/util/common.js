/**
 * 公用方法集合，不涉及逻辑
 *
 */
import client from 'util/client'; // 设备信息
import _ from 'lodash';
import { guid } from './guid';
import { toFetch } from './fetch';
import { log } from './debug-tool';
/**
 * 递归处理获取接口数据
 */
export { guid };

export function toPlainObject(params, explain) {
  let _params = params;
  let map = _.map;
  // 文件上传类型不处理
  if (
    typeof params !== 'undefined' &&
    (params.constructor === window.File || params.constructor === window.Blob)
  ) {
    return params;
  }

  if (!_.isArrayLike(params)) {
    _params = _.toPlainObject(params);
    map = _.mapValues;
  }

  const _newParams = map(_params, val => {
    if (_.isObject(val)) {
      return toPlainObject(val, explain);
    }
    return _.toString(val);
  });
  return _newParams;
}

export { toFetch };

/**
 * 多类继承
 */
function copyProperties(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      const desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
export function mix(...mixins) {
  class Mix {
    constructor(props) {
      for (const Mixin of mixins) {
        copyProperties(this, new Mixin(props));
        copyProperties(Mix.prototype, Mixin.prototype);
      }
    }
  }
  return Mix;
}

export class MaskMin {
  Get(paths = []) {
    return _.sum(_.at(this, _.map(paths, _.toUpper))) || 0;
  }
  GetObj(paths = []) {
    const _obj = {};
    _.forEach(paths, item => {
      _.forEach(this, (value, key) => {
        if (value == item.mask) {
          _obj[_.toLower(key)] = _.values(item.mask_value)[0];
        }
      });
    });
    return _obj;
  }
}
/**
 * 修改描述
 */
export function onEnumerable(target, name, descriptor) {
  descriptor.enumerable = true;
  return descriptor;
}

/**
 * 解析字符串
 */
const parse = str => {
  if (typeof str === 'string') {
    return JSON.parse(str);
  }
  return str;
};
/**
 * 深拷贝(只支持无方法的对象
 */
const assign = (...objectList) => {
  const _object = objectList.splice(0, 1)[0];
  for (const item of objectList) {
    Object.assign(_object, JSON.parse(JSON.stringify(item)));
  }
  return _object;
};
/**
 * 只赋值给到第一个元素存在的对象
 */
const getData = (param = {}, ...data) => {
  const _data = assign({}, ...data);
  const _param = assign({}, param);

  for (const key in _param) {
    _param[key] = _data[key] || _param[key];
  }

  return _param;
};

export default (window.tool = {
  log,
  client,
  parse,
  assign,
  getData
});
