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
    return fetch({
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
  async getPostList({ limit = 8, page = 1, tag = '', author = '' } = {}) {
    const param = {
      limit,
      page,
      include: 'authors,tags'
    };
    if (tag) {
      param.filter = `tag:${tag}`;
    }
    if (author) {
      param.filter = `author:${author}`;
    }
    return fetch({
      param,
      method: 'posts',
      type: 'browse'
    });
    // .then(res => {
    //   res.posts.forEach(post => {
    //     console.log(
    //       readingTime(post, {
    //         minute: '1 minute read.',
    //         minutes: '% minutes read.'
    //       })
    //     );
    //   });
    // console.log('list', res);
    // });
  }

  @action('存入相关')
  saveHandle(key, data) {
    this.main[key] = data;
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
  async getTagList() {
    const tagList = [];
    const res = await fetch({
      method: 'tags',
      type: 'browse'
    });
    let i = 1;
    for (let item of res.tags) {
      const res2 = await this.getPostList({
        limit: 0,
        page: 0,
        tag: item.slug
      });
      tagList.push({
        name: item.name,
        // value: i,
        children: _.map(res2.posts, item2 => {
          return {
            name: item2.title,
            id: item2.id,
            value: i
          };
        })
      });
      i++;
    }
    runInAction(() => {
      this.main.taglist = tagList;
    });
    console.log('taglist', res);
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

  @action('开关tag')
  switchTag() {
    this.main.showTag = !this.main.showTag;
  }
}
