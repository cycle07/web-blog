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
  }
  componentDidMount() {
    const { mainAction, main } = this.props;
    document.addEventListener(
      'scroll',
      _.throttle(e => {
        if (main.showTag) {
          console.log(12313);
          e.preventDefault();
          e.stopPropagation();
        }
      }, 100)
    );
    mainAction.initHeader();
    mainAction.getPostList({
      author: 'cycle07'
    });
    mainAction.getAuthor();
    // mainAction.getTagList();
    mainAction.getPageList();
  }
  render() {
    const {
      main: { setting }
    } = this.props;
    return (
      <Router>
        {setting && (
          <Scrollbars {...scrollbarSetting()}>
            <div className="wrap">
              <Header />
              <Switch>
                <Redirect exact from="/" to="/home" />
                <Route path="/home" component={Home} />
                <Route path="/list" component={ListHome} />
              </Switch>
              <Footer />
            </div>
          </Scrollbars>
        )}
      </Router>
    );
  }
}
