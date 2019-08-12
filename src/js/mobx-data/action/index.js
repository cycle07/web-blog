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
      // console.log('setting', res);
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
  }

  @action('获取文章详情')
  getPostDetail(slug) {
    return fetch({
      param: { slug, include: 'authors,tags' },
      method: 'posts/slug',
      type: 'read'
    });
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
    const cut = str => (str.length > 16 ? str.slice(0, 15) + '..' : str);
    for (let item of res.tags) {
      const res2 = await this.getPostList({
        limit: 0,
        page: 0,
        tag: item.slug
      });
      tagList.push({
        name: cut(item.name),
        tag: item.slug,
        // value: i,
        children: _.map(res2.posts, item2 => {
          return {
            name: cut(item2.title),
            slug: item2.slug,
            value: i
          };
        })
      });
      i++;
    }
    runInAction(() => {
      this.main.taglist = tagList;
    });
  }

  @action('Tag详情')
  getTagDetail(slug) {
    return fetch({
      param: { slug, include: 'authors,tags' },
      method: 'tags/slug',
      type: 'read'
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

  @action('开关tag')
  switchTag() {
    this.main.showTag = !this.main.showTag;
  }
}
