import { Component } from 'react';
import { observer, inject } from 'mobx-react';
import GhostLogo from 'img/ghost.png';

@inject('main')
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
            <img
              src={
                'https://cdn.jsdelivr.net/gh/moezx/cdn@3.0.8/img/logo/logo_onwhite.png'
              }
              alt=""
            />
            <img
              src={
                'https://cdn.jsdelivr.net/gh/moezx/cdn@3.0.8/img/logo/Google.svg'
              }
              alt=""
            />
            <img
              src={
                'https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png'
              }
              alt=""
            />
            <img src={GhostLogo} alt="" />
          </div>
        </div>
        <div className="bottom">
          {`Copyright © 2019, cycle07 - ${setting.title}. All Right Reserved.`}
        </div>
      </footer>
    );
  }
}
