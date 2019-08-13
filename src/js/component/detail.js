import { Component } from 'react';
import { getDate } from 'helpers/time-deal';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
import Footer from './footer';

import Loading from './loading';
import hljs from 'highlight.js';
import 'highlight.js/styles/zenburn.css';
import Systemjs from 'systemjs';

@inject('main', 'mainAction')
@observer
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      th: 0,
      tagList: null,
      tagImg: null,
      PostList: null
    };
    this.his = this.props.match.url;
    // this.cw = window.document.body.offsetWidth;
    // this.ch = window.document.body.offsetHeight;
    // this.ch = 640;
    // this.bh = (this.cw / 16) * 9;
    this.handleOnClick = this.handleOnClick.bind(this);
    this.init = this.init.bind(this);
    this.init();
  }
  init() {
    const {
      mainAction: { getPostDetail, getPostList, getTagDetail }
    } = this.props;
    getPostDetail(this.props.match.params.slug).then(res => {
      this.setState({
        data: res.posts[0]
      });
      getPostList({ limit: 999 }).then(res2 => {
        this.setState({
          PostList: res2.posts
        });
      });
      getPostList({ tag: res.posts[0].tags[0].slug }).then(res2 => {
        this.setState({
          tagList: res2.posts
        });
      });
      getTagDetail(res.posts[0].tags[0].slug).then(res2 => {
        this.setState({
          tagImg: res2.tags[0].feature_image
        });
      });
    });
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
    if (this.state.th === 0) {
      // Systemjs.import('isso');
      this.setState({
        th: this.bannerDom.clientHeight
      });
    }
    if (this.html) {
      const blocks = this.html.querySelectorAll('pre code');
      _.map(blocks, item => {
        hljs.highlightBlock(item);
      });
      const imgDoms = this.html.querySelectorAll('img');
      _.map(imgDoms, item => {
        if (item.getAttribute('width')) {
          const rate = item.getAttribute('width') / item.getAttribute('height');
          item.parentNode.setAttribute('style', `flex: ${rate} 1 0%;`);
        }
      });
    }
  }
  handleOnClick(slug = '', type = 'detail') {
    const { history } = this.props;
    history.push(`/${type}/${slug}`);
    // location.reload();
  }
  get getHtml() {
    const { data } = this.state;
    if (data) {
      // console.log(/\s/g.test(data.html));
      // return {
      //   __html: `${data.html.replace(/&lt;/g, '<').replace(/&gt;/g, '>')}`
      // };
      return {
        __html: data.html
      };
    }
  }
  render() {
    const {
      main: { setting }
    } = this.props;
    const { data, th, tagImg, PostList, tagList } = this.state;
    const currentIndex = _.findIndex(PostList, item => item.id === data.id);
    if (!data) return <Loading />;
    return (
      <div className="detail">
        <div
          className="banner"
          style={{
            backgroundImage: `url(${data.feature_image})`,
            height: `${th}px`
          }}
        >
          <div className="mask_gaosi" />
          <div className="banner_wrap">
            <div
              className="banner_inner"
              ref={e => {
                this.bannerDom = e;
              }}
            >
              <div className="title">{data.title}</div>
              <div className="img_wrap">
                <span className="date">
                  {`${getDate(data.updated_at)} / `}
                  <i className="tags">
                    {_.map(data.tags, item => (
                      <i
                        onClick={() => this.handleOnClick(item.slug, 'hometag')}
                      >
                        {`${item.name} `}
                      </i>
                    ))}
                  </i>
                </span>
                <div
                  className="img"
                  style={{
                    backgroundImage: `url(${data.feature_image})`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="banner"
          style={{
            backgroundImage: `url(${data.feature_image})`,
            height: `${(this.cw / 16) * 9}px`
          }}
        /> */}
        <div className="inner" style={{ paddingTop: `${this.ch}px` }}>
          <div
            className="inner_left"
            ref={e => {
              this.html = e;
            }}
          >
            <pre className="pre" dangerouslySetInnerHTML={this.getHtml} />
          </div>
          <div className="inner_right">
            <div className="profile">
              <div className="about">About Me</div>
              <img
                className="authors_icon"
                alt=""
                src={data.primary_author.profile_image}
              />
              <div className="authors_name">{`${setting.title}/${
                data.primary_author.name
              }`}</div>
              <div className="vs">VISIT PROFILE</div>
            </div>
            <div className="info">
              <div className="date">{getDate(data.updated_at)}</div>
              <div className="tages">
                {_.map(data.tags, item => (
                  <div
                    className="item_tag"
                    onClick={() => this.handleOnClick(item.slug, 'hometag')}
                  >
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="more">
          <div className="more_inner">
            {tagList && (
              <div
                className="tag_main"
                style={{
                  backgroundImage: `url(${tagImg})`,
                  width: `${currentIndex > 0 ? '30%' : '45%'}`
                }}
              >
                <div className="wrap">
                  <div>{`- ${setting.title} -`}</div>
                  <div>{`${data.tags[0].name}`}</div>
                  <div>{'♾'}</div>
                  <div onClick={() => this.handleOnClick(tagList[0].slug)}>
                    {tagList[0].title}
                  </div>
                  <div onClick={() => this.handleOnClick(tagList[1].slug)}>
                    {_.get(tagList, [1, 'title'], null)}
                  </div>
                  <div onClick={() => this.handleOnClick(tagList[2].slug)}>
                    {_.get(tagList, [2, 'title'], null)}
                  </div>
                  <div
                    onClick={() =>
                      this.handleOnClick(data.tags[0].slug, 'hometag')
                    }
                  >{`See all ${tagList.length} post >`}</div>
                </div>
              </div>
            )}
            {currentIndex !== -1 && (
              <div
                className="sample"
                style={{
                  backgroundImage: `url(${
                    PostList[currentIndex + 1].feature_image
                  })`,
                  width: `${currentIndex > 0 ? '30%' : '45%'}`
                }}
              >
                <div
                  className="wrap"
                  onClick={() =>
                    this.handleOnClick(PostList[currentIndex + 1].slug)
                  }
                >
                  <div>Previous Post</div>
                  <div>{PostList[currentIndex + 1].title}</div>
                  <div>{getDate(PostList[currentIndex + 1].updated_at)}</div>
                </div>
              </div>
            )}
            {currentIndex > 0 && (
              <div
                className="sample"
                style={{
                  backgroundImage: `url(${
                    PostList[currentIndex - 1].feature_image
                  })`,
                  width: '30%'
                }}
              >
                <div
                  className="wrap"
                  onClick={() =>
                    this.handleOnClick(PostList[currentIndex - 1].slug)
                  }
                >
                  <div>Next Post</div>
                  <div>{PostList[currentIndex - 1].title}</div>
                  <div>{getDate(PostList[currentIndex - 1].updated_at)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id="vcomments">
          <section id="isso-thread"></section>
        </div>
        <Footer />
      </div>
    );
  }
}
