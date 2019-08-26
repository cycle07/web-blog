/**
 * 主要输出js
 */
import 'less/pages/index.less';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
import Footer from './footer';
import Aboutcut from 'img/aboutcut.jpg';
import Penzai from 'img/penzai.svg';

const selfIntruction = [
  {
    e: 'Unprofessional Front-end coder',
    z: '不务正业的前端程序员'
  },
  {
    e: 'skimmed piano',
    z: '会弹一点曲子'
  },
  {
    e: 'Once in a draw',
    z: '会画一点画'
  },
  {
    e: 'fall in Music Game',
    z: '喜欢音游'
  },
  '~Peace~'
];

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
              {_.map(this.state.arr, item => {
                if (item.e) {
                  return (
                    <div className="box">
                      <h1>{item.e}</h1>
                      <h1>{item.z}</h1>
                    </div>
                  );
                } else {
                  return (
                    <div className="box" alt="github">
                      <img
                        src={Penzai}
                        alt="github"
                        onClick={() => {
                          const openWindow = open();
                          openWindow.location.href =
                            'https://github.com/cycle07';
                        }}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <img className='img' src={Aboutcut} alt="" />
        <Footer />
      </div>
    );
  }
}
