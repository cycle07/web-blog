/**
 * 数据,操作,计算 整合文件
 */
import './configure';
// 数据
import { Main } from './store';
// 操作
import { MainAction } from './action';
// 计算
import { MainComputed } from './computed';

export default new class {
  store = {
    main: new Main()
  };

  action = {
    main: new MainAction(this)
  };

  computed = {
    main: new MainComputed(this)
  };
}();
