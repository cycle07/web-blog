import { Component } from 'react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
import GoDownSvg from 'img/goDown.svg';
import Li from './li';
import Page from './page';

@inject('main', 'mainAction')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.ch = window.document.body.offsetHeight;
    this.goDown = this.goDown.bind(this);
    this.getList = this.getList.bind(this);
    this.getList(1);
  }
  getList(page, goTop) {
    const {
      mainAction,
      main: { homelspage, scrollDom }
    } = this.props;
    mainAction
      .getPostList({
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
  componentDidMount() {}
  render() {
    const {
      main: { setting, homelist, touchTop, homelspage, homelspages }
    } = this.props;
    return (
      <div className="home">
        <div
          className="banner"
          style={{
            'background-image': `url(${setting.cover_image})`,
            height: `${this.ch}px`
          }}
        >
          <div className="desc">{`“${setting.description}”`}</div>
          {touchTop < this.ch - 500 && (
            <div className="go_down" onClick={this.goDown}>
              <img src={GoDownSvg} alt="" />
            </div>
          )}
        </div>
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
      </div>
    );
  }
}
