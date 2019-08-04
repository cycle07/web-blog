/**
 * 主要输出js
 */
import "less/pages/index.less";
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {
  Route,
  Redirect,
  Switch,
  HashRouter as Router
} from "react-router-dom";
import Header from "./header";
import Home from "./home";
import Footer from "./footer";
import Tag from "./tag";

@inject("main", "mainAction")
@observer
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { mainAction } = this.props;
    mainAction.initHeader();
    mainAction.getPostList({
      author: "ghost"
    });
    mainAction.getAuthor();
    mainAction.getTagList();
    mainAction.getPageList();
  }
  render() {
    const {
      main: { setting }
    } = this.props;
    return (
      <Router>
        {setting && (
          <div className="wrap">
            <Header />
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={Home} />
              <Route path="/tag" component={Tag} />
            </Switch>
            <Footer />
          </div>
        )}
      </Router>
    );
  }
}
