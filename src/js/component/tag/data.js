/**
 * 数据图表
 */
import { Component } from 'react';
import _ from 'lodash';
import echarts from 'echarts';

class ServerDataForm extends Component {
  constructor(props) {
    super(props);
    this.option = {};
    this.lastFatherTag = null;
  }
  componentDidMount() {
    this.myCharts(this.props.data);
  }
  myCharts(data) {
    const myChart = echarts.init(this.chart);
    myChart.on('click', param => {
      const slug = _.get(param, ['data', 'slug']);
      const tag = _.get(param, ['data', 'tag']);
      if (slug) {
        location.href = `${location.origin}${
          location.pathname
        }#/detail/${slug}`;
        this.props.onClose();
        // location.reload();
      } else {
        if (tag && this.lastFatherTag === tag) {
          location.href = `${location.origin}${
            location.pathname
          }#/homeTag/${tag}`;
          this.props.onClose();
          // location.reload();
        } else {
          this.lastFatherTag = tag;
        }
      }
    });
    this.option = {
      visualMap: {
        type: 'continuous',
        min: 0,
        max: 10,
        inRange: {
          color: ['#2D5F73', '#538EA6', '#F2D1B3', '#F2B8A2', '#F28C8C']
        },
        show: false
      },
      series: {
        type: 'sunburst',
        data: data,
        radius: [0, '90%'],
        label: {
          rotate: 'radial'
        }
      }
    };
    myChart.setOption(this.option);
  }
  render() {
    return (
      <div
        className="serverdataform"
        ref={e => {
          this.chart = e;
        }}
      />
    );
  }
}

export default ServerDataForm;
