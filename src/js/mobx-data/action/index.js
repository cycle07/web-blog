/**
 * action:操作
 */
import { action, runInAction } from 'mobx';
import fetch from 'helpers/api';
import DataPromise from 'util/promise-class';

export class MainAction {
  constructor(props) {
    this.props = props;
    const { store } = props;
    this.main = store.main;
  }

  // 创建动作
  @action('加加')
  init() {
    fetch(
      {
        limit: 5,
        include: 'tag,authors'
      },
      'posts',
      'browse'
    ).then(res => {
      console.log(res);
    });
  }
}
