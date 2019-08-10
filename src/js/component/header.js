import { Component } from 'react';
import classnames from 'classnames';
import { observer, inject } from 'mobx-react';
import Tag from './tag';
import _ from 'lodash';
import GoTop from 'img/goTop.svg';

@inject('main', 'mainAction')
@observer
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleGoTop = this.handleGoTop.bind(this);
  }
  handleClick(label) {
    const { mainAction } = this.props;
    if (label === 'Tag') {
      mainAction.switchTag();
    } else if (label === 'Home') {
      location.href = location.origin + location.pathname;
    }
  }
  handleGoTop() {
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
  render() {
    const {
      main: { setting, showTag, touchTop }
    } = this.props;
    const classes = classnames({
      smallheader: touchTop
      ||
      /#\/detail/g.test(location.hash)
    });
    return (
      <header className={classes}>
        <div className="inner">
          <div className="logo" onClick={() => this.handleClick('Home')}>
            <img src={setting.logo} alt="" />
          </div>
          <ul>
            {_.map(setting.navigation, item => (
              <li>
                <span
                  onClick={() => {
                    this.handleClick(item.label);
                  }}
                >
                  {_.upperCase(item.label)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {showTag && <Tag />}
        {touchTop !== 0 && (
          <div className="goTop" onClick={this.handleGoTop}>
            <img src={GoTop} alt="" />
          </div>
        )}
      </header>
    );
  }
}
