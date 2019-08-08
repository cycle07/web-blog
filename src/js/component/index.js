/**
 * 主要输出js
 */
import 'less/pages/index.less';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import scrollbarSetting from 'helpers/scrollbarstyle';
import { Scrollbars } from 'helpers/scroll';
import {
  Route,
  Redirect,
  Switch,
  HashRouter as Router
} from 'react-router-dom';
import _ from 'lodash';
import Header from './header';
import Home from './home';
import Footer from './footer';
import ListHome from './listHome';

@inject('main', 'mainAction')
@observer
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.initSetting();
  }
  initSetting() {
    const { mainAction } = this.props;
    mainAction.initHeader().then(res => {
      const {
        main: { setting }
      } = this.props;
      document.title = setting.title;
      document.getElementById('favicon').setAttribute('href', setting.icon);
    });
  }
  handleScroll(e) {
    const { main, mainAction } = this.props;
    if (main.showTag) {
      e.preventDefault();
      e.stopPropagation();
    }
    mainAction.saveHandle('touchTop', e.target.scrollTop);
  }
  // componentDidMount() {
  // const { mainAction } = this.props;
  // mainAction.getAuthor();
  // // mainAction.getTagList();
  // mainAction.getPageList();
  // }
  render() {
    const {
      main: { setting }
    } = this.props;
    return (
      <Router>
        <Scrollbars
          className="scrollWrap"
          {...scrollbarSetting()}
          onScroll={_.throttle(this.handleScroll, 100)}
        >
          {setting && (
            <div className="wrap">
              <Header />
              <Switch>
                <Redirect exact from="/" to="/home" />
                <Route path="/home" component={Home} />
                <Route path="/list" component={ListHome} />
              </Switch>
              <Footer />
            </div>
          )}
        </Scrollbars>
      </Router>
    );
  }
}
