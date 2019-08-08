/**
 * store:数据
 */
import { observable, ObservableMap } from "mobx";
/**
 * 测试
 */
export class Main {
  @observable setting = null;
  @observable showTag = false;
  @observable taglist = null;
  @observable homelist = null;
  @observable touchTop = true;
}
