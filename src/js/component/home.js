import { Component } from "react";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import _ from "lodash";
import GoDownSvg from "img/goDown.svg";
import Li from "./li";
import Footer from "./footer";
import Page from "./page";

@inject("main", "mainAction")
@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.his = this.props.match.url;
    this.ch = window.document.body.offsetHeight;
    this.cw = window.document.body.offsetWidth;
    this.goDown = this.goDown.bind(this);
    this.getList = this.getList.bind(this);
    this.getList(1, "0");
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
        mainAction.saveHandle("homelist", res.posts);
        mainAction.saveHandle("homelspage", page);
        mainAction.saveHandle("homelspages", res.meta.pagination.pages);
        if (scrollDom && goTop) {
          scrollDom.scrollTo({
            top: goTop,
            behavior: "smooth"
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
        behavior: "smooth"
      });
    }
  }
  componentDidUpdate() {
    // if (this.props.match.url !== this.his) {
    //   this.his = this.props.match.url;
    // this.getList(1);
    //   const {
    //     main: { scrollDom }
    //   } = this.props;
    //   if (scrollDom) {
    //     scrollDom.scrollTo({
    //       top: 0,
    //       behavior: 'smooth'
    //     });
    //   }
    // }
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
            "background-image": `url(${setting.cover_image})`,
            height: `${this.ch}px`
          }}
        >
          <div className="home_desc">{`“${setting.description}”`}</div>
          <span className="home_big">AD:</span>
          <span className="home_name">STRUCTURE</span>
          <div
            className="mask"
            style={{
              top: `${this.ch / 2 - 50}px`
            }}
          />
          {touchTop < this.ch - 500 && (
            <div className="go_down" onClick={this.goDown}>
              <img src={GoDownSvg} alt="" />
            </div>
          )}
        </div>
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
          goPreview={() => this.getList(homelspage - 1, this.ch - 200)}
          goNext={() => this.getList(homelspage + 1, this.ch - 200)}
        />
        <Footer />
      </div>
    );
  }
}
