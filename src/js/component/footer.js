import { Component } from "react";
import { observer, inject } from "mobx-react";
import GhostLogo from "img/ghost.png";

const onUrl = url => {
  const openWindow = open();
  openWindow.location.href = url;
};
@inject("main")
@observer
export default class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      main: { setting }
    } = this.props;
    return (
      <footer>
        <div className="logo">
          <div className="inner">
            <div className="img_wrap">
              <img
                src={
                  "https://cdn.jsdelivr.net/gh/moezx/cdn@3.0.8/img/logo/logo_onwhite.png"
                }
                alt=""
                onClick={() => onUrl("https://my.vultr.com")}
              />
            </div>
            <div className="img_wrap">
              <img
                src={
                  "https://cdn.jsdelivr.net/gh/moezx/cdn@3.0.8/img/logo/Google.svg"
                }
                alt=""
                onClick={() => onUrl("https://www.google.com")}
              />
            </div>
            <div className="img_wrap">
              <img
                src={
                  "https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png"
                }
                alt=""
                onClick={() => onUrl("https://www.aliyun.com")}
              />
            </div>
            <div className="img_wrap">
              <img
                src={GhostLogo}
                alt=""
                onClick={() => onUrl("https://docs.ghost.org/")}
              />
            </div>
          </div>
        </div>
        <div className="bottom">
          {`Copyright © 2019, cycle07 - ${setting.title}. All Right Reserved.`}
        </div>
      </footer>
    );
  }
}
