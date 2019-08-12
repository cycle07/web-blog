import { Component } from 'react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
import GoDownSvg from 'img/goDown.svg';
import Li from './li';
import Footer from './footer';
import Page from './page';

@inject('main', 'mainAction')
@observer
export default class HomeTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagInfo: null
    };
    this.his = this.props.match.url;
    this.ch = window.document.body.offsetHeight;
    this.goDown = this.goDown.bind(this);
    this.getList = this.getList.bind(this);
    this.init = this.init.bind(this);
    this.init();
  }
  init() {
    const {
      main: { scrollDom }
    } = this.props;
    if (scrollDom) {
      scrollDom.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    this.getList(1);
    this.props.mainAction
      .getTagDetail(this.props.match.params.slug)
      .then(res => {
        this.setState({
          tagInfo: res.tags[0]
        });
      });
  }
  getList(page, goTop) {
    const {
      mainAction,
      main: { homelspage, scrollDom }
    } = this.props;
    mainAction
      .getPostList({
        tag: this.props.match.params.slug,
        page
      })
      .then(res => {
        mainAction.saveHandle('homelist', res.posts);
        mainAction.saveHandle('homelspage', page);
        mainAction.saveHandle('homelspages', res.meta.pagination.pages);
        if (scrollDom && goTop) {
          scrollDom.scrollTo({
            top: this.ch - 200
          });
        }
      });
  }
  goDown() {
    const {
      main: { scrollDom }
    } = this.props;
    if (scrollDom) {
      scrollDom.scrollTo({
        top: this.ch,
        behavior: 'smooth'
      });
    }
  }
  componentDidUpdate() {
    if (this.props.match.url !== this.his) {
      this.his = this.props.match.url;
      this.init();
      const {
        main: { scrollDom }
      } = this.props;
      if (scrollDom) {
        scrollDom.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }
  render() {
    const {
      main: { setting, homelist, touchTop, homelspage, homelspages }
    } = this.props;
    const { tagInfo } = this.state;
    return (
      <div className="home">
        {tagInfo && (
          <div
            className="banner"
            style={{
              'background-image': `url(${tagInfo.feature_image})`,
              height: `${this.ch}px`
            }}
          >
            <div className="desc">{`“${tagInfo.description}”`}</div>
            <div className="name">{tagInfo.name}</div>
            {touchTop < this.ch - 500 && (
              <div className="go_down" onClick={this.goDown}>
                <img src={GoDownSvg} alt="" />
              </div>
            )}
          </div>
        )}
        <div id="home" />
        {homelist.length > 0 && (
          <ul className="list">
            {_.map(toJS(homelist), item => (
              <Li data={item} {...this.props} />
            ))}
          </ul>
        )}
        <Page
          page={homelspage}
          total={homelspages}
          goPreview={() => this.getList(homelspage - 1, true)}
          goNext={() => this.getList(homelspage + 1, true)}
        />
        <Footer />
      </div>
    );
  }
}
