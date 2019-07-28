/**
 * computed:计算
 */
import { computed } from 'mobx';

export class MainComputed {
  constructor(props) {
    this.props = props;
    const { store } = props;
  }
  // 创建计算
  // @computed
  // get total() {
  //   return this.title.data * this.title.data;
  // }
}
