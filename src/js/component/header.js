import { Component } from 'react';
import classnames from 'classnames';
import { observer, inject } from 'mobx-react';
import Tag from './tag';
import _ from 'lodash';
import GoTop from 'img/goTop.svg';
import Icon from 'public/icon';

@inject('main', 'mainAction')
@observer
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleGoTop = this.handleGoTop.bind(this);
    this.handleAddFav = this.handleAddFav.bind(this);
  }
  handleClick(label) {
    const { mainAction } = this.props;
    if (label === 'Tag') {
      mainAction.switchTag();
    } else if (label === 'Home') {
      location.href = location.origin + location.pathname + '#/home';
    } else if (label === 'About') {
      location.href = location.origin + location.pathname + '#/about';
    } else if (label === 'Record') {
      location.href = location.origin + location.pathname + '#/record';
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
  handleAddFav() {
    if (window.sidebar) {
      // Mozilla Firefox Bookmark
      window.sidebar.addPanel(location.href, document.title, '');
    } else if (window.external) {
      // IE Favorite
      if (window.external.AddFavorite) {
        window.external.AddFavorite(location.href, document.title);
      } else {
        alert('Please use ctrl+D');
      }
    } else if (window.opera && window.print) {
      // Opera Hotlist
      this.title = document.title;
      return true;
    }
  }
  render() {
    const {
      main: { setting, showTag, touchTop }
    } = this.props;
    const classes = classnames({
      smallheader: touchTop || /#\/[detail|about|record]/g.test(location.hash)
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
            <div className="icons">
              <Icon
                type="rss"
                onClick={() => {
                  location.href = `https://www.cycle07.com/rss`;
                }}
              />
              <Icon type="shoucang" onClick={this.handleAddFav} />
              <Icon
                type="tubiao212"
                onClick={() => {
                  alert('Deving...');
                }}
              />
            </div>
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
