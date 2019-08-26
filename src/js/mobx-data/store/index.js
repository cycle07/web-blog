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
  @observable homelist = [];
  @observable homelspage = 0;
  @observable homelspages = 1;
  @observable touchTop = 0;
  @observable scrollDom = null;
  @observable allList = null;
}
