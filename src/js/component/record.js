/**
 * 主要输出js
 */
import 'less/pages/index.less';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
import Footer from './footer';
import { getDate, mt } from 'helpers/time-deal';
import RecordImg from 'img/record.png';

const yearArr = key =>
  _.get(
    {
      2019: 'Nothing happened in...',
      2020: 'A next to new field...',
      2021: 'More and more powerfull'
    },
    key
  );

@inject('main')
@observer
export default class About extends Component {
  constructor(props) {
    super(props);
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
      main: { allList },
      history
    } = this.props;
    if (!allList) return null;
    let arr = [];
    _.map(allList, item => {
      const y = item.created_at.slice(0, 9).split('-')[0];
      const m = item.created_at.slice(0, 9).split('-')[1];
      // const d = item.created_at.slice(0, 9).split('-')[2];
      const yi = _.findIndex(arr, item => item.y === y);
      if (yi === -1) {
        arr.push({
          y,
          data: [
            {
              m,
              data: [item]
            }
          ]
        });
      } else {
        const mData = arr[yi].data;
        const mi = _.findIndex(mData, item2 => item2.m === m);
        if (mi === -1) {
          arr[yi].data.push({
            m,
            data: [item]
          });
        } else {
          arr[yi].data[mi].data.push(item);
        }
      }
    });
    return (
      <div className="record">
        <div
          className="record_wrap"
          style={{
            minHeight: `${window.document.body.offsetHeight - 100}px`
          }}
        >
          <div className="content">
            <div className="inner">
              {_.map(arr, item => {
                return (
                  <div className="year">
                    <div className="year_title">
                      {item.y}
                      <span>{yearArr(item.y)}</span>
                    </div>
                    {_.map(item.data, item2 => {
                      return (
                        <div className="month">
                          <div className="month_title">
                            <div className="month_title_inner">
                              {mt(item2.m)}
                            </div>
                          </div>
                          <div className="month_content">
                            {_.map(item2.data, item3 => {
                              return (
                                <div
                                  className="day"
                                  onClick={() => {
                                    history.push(`/detail/${item3.slug}`);
                                  }}
                                >
                                  <div>
                                    <h1>{item3.title}</h1>
                                    <i>{`/ ${getDate(item3.created_at).slice(
                                      0,
                                      6
                                    )}`}</i>
                                  </div>
                                  <span>{item3.excerpt}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
