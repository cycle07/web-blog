/* eslint no-var: "off", prefer-arrow-callback: "off" */
/**
 * 英文语言包
 */
(function(f) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = f();
  } else if (typeof define === 'function' && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== 'undefined') {
      g = window;
    } else if (typeof global !== 'undefined') {
      g = global;
    } else if (typeof self !== 'undefined') {
      g = self;
    } else {
      g = this;
    }
    g.lang = f();
  }
})(function() {
  return {
    hi: 'hi'
  };
});
