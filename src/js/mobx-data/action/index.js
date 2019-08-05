/**
 * action:操作
 */
import { action, runInAction } from 'mobx';
import fetch from 'helpers/api';
import DataPromise from 'util/promise-class';
import _ from 'lodash';
import { readingTime } from 'helpers/helpers';

export class MainAction {
  constructor(props) {
    this.props = props;
    const { store } = props;
    this.main = store.main;
  }

  @action('粗祀发')
  initHeader() {
    fetch({
      method: 'settings',
      type: 'browse'
    }).then(res => {
      runInAction(() => {
        this.main.setting = _.get(res, ['settings']);
      });
      console.log('setting', res);
    });
  }

  @action('获取文章列表')
  getPostList({ limit = 5, page = 1, tag = '', author = '' } = {}) {
    const param = {
      limit,
      page
    };
    if (tag) {
      param.filter = `tag:${tag}`;
    }
    if (author) {
      param.filter = `author:${author}`;
    }
    fetch({
      param,
      method: 'posts',
      type: 'browse'
    }).then(res => {
      res.posts.forEach(post => {
        console.log(
          readingTime(post, {
            minute: '1 minute read.',
            minutes: '% minutes read.'
          })
        );
      });
      console.log('list', res);
    });
  }

  @action('作者列表')
  getAuthor() {
    fetch({
      method: 'authors',
      type: 'browse'
      // type: 'read'
    }).then(res => {
      console.log('author', res);
    });
  }

  @action('Tag列表')
  getTagList() {
    fetch({
      method: 'tags',
      type: 'browse'
    }).then(res => {
      console.log('taglist', res);
    });
  }

  @action('PAGE列表')
  getPageList() {
    fetch({
      method: 'pages',
      type: 'browse'
    }).then(res => {
      console.log('page', res);
    });
  }
}
