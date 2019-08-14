/**
 * 主要输出js
 */
import 'less/pages/index.less';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
import Footer from './footer';
import { callbackify } from 'util';

const mt = m =>
  [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ][parseInt(m) - 1];

const jjj = [
  {
    name: 'yooo',
    article:
      'yaoooo00asdasda，sdasdasdasdasdadsasd，asdkasjkdh，jadsjasdasdasdasdasdasdasd',
    created_at: '2019-08-12T10:06:38.000+00:00'
  },
  {
    name: 'y4444',
    article:
      'yaoooo00asdasd，asdasdasdasdas，dadsasdasdkasj，kdhjadsjasdasdasdasdasdasdasd!',
    created_at: '2019-06-06T10:06:38.000+00:00'
  },
  {
    name: 'y4444',
    article:
      'yaoooo00asdas，dasdasdasdasdasdadsasda，sdkasjkdhjadsjasdasdasdasdas，dasdasd!',
    created_at: '2019-06-12T10:06:38.000+00:00'
  },
  {
    name: 'y4444',
    article:
      'yaoooo00asdas，dasdasdasdasdasdadsa，sdasdkasjkdhjadsjasdasdasda，sdasdasdasd!',
    created_at: '2019-01-12T10:06:38.000+00:00'
  },
  {
    name: 'y4444',
    article:
      'yaoooo00asda，sdasdasdasdasdasdads，asdasdkasjkdhjadsjasdasdasd，asdasdasdasd!',
    created_at: '2018-12-12T10:06:38.000+00:00'
  },
  {
    name: 'y4444',
    article:
      'yaoooo00，asdasdasdasdasdasda，sdadsasdasdkasjkdhjadsjasdas，dasdasdasdasdasd!',
    created_at: '2018-08-12T10:06:38.000+00:00'
  },
  {
    name: 'y4444',
    article:
      'yaoooo00asdas，dasdasdasdasdasdadsasdas，dkasjkdhjadsjasdasdasdasdasdas，dasd!',
    created_at: '2018-04-12T10:06:38.000+00:00'
  },
  {
    name: 'y4444',
    article:
      'yaoooo00asdasdasdasdasdasdasdadsasdasdkasjkdhjadsjasdasdasdasdasdasdasd!',
    created_at: '2017-08-12T10:06:38.000+00:00'
  }
];

@inject('main', 'mainAction')
@observer
export default class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let arr = [];
    _.map(jjj, item => {
      const y = item.created_at.slice(0, 9).split('-')[0];
      const m = item.created_at.slice(0, 9).split('-')[1];
      const d = item.created_at.slice(0, 9).split('-')[2];
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
          className="content"
          style={{ minHeight: `${window.document.body.offsetHeight - 100}px` }}
        >
          <div className="inner">
            {_.map(arr, item => {
              return (
                <div className="year">
                  <div className="year_title">{item.y}</div>
                  {_.map(item.data, item2 => {
                    return (
                      <div className="month">
                        <div className="month_title">{mt(item2.m)}</div>
                        <div className="month_content">
                          {_.map(item2.data, item3 => {
                            return (
                              <div className="day">
                                <div>{item3.name}</div>
                                <span>{item3.article}</span>
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
        <Footer />
      </div>
    );
  }
}
