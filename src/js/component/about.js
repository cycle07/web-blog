/**
 * 主要输出js
 */
import 'less/pages/index.less';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
import Footer from './footer';
import Aboutcut from 'img/aboutcut.jpg';

const selfIntruction = [
  'Unprofessional Front-end coder',
  '不务正业的前端程序员',
  'skimmed piano',
  '会弹一点曲子',
  'Once in a draw',
  '会画一点画',
  'fall in Music Game',
  '喜欢音游',
  '~Peace~'
];

// const selfIntruction = ['ddddd', '1231233333333', '423423ddddd4', 'erertert'];

@inject('main', 'mainAction')
@observer
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: []
    };
    this.asyncAdd = this.asyncAdd.bind(this);
  }
  asyncAdd = item =>
    new Promise((resolve, reject) => {
      let arr = this.state.arr;
      arr.push(item);
      setTimeout(() => {
        this.setState({
          arr
        });
        resolve(true);
      }, 1000);
    });
  async componentDidMount() {
    for (let item of selfIntruction) {
      await this.asyncAdd(item);
    }
  }
  render() {
    return (
      <div
        className="about"
        style={{ height: `${window.document.body.offsetHeight}px` }}
      >
        <div className="content">
          <div className="inner">
            <div className="ininner">
              {_.map(this.state.arr, item => (
                <h1>{item}</h1>
              ))}
            </div>
          </div>
        </div>
        <img className="img" src={Aboutcut} alt="" />
        <Footer />
      </div>
    );
  }
}
