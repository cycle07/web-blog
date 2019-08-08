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
  }
  componentDidMount() {
    this.myCharts(this.props.data);
  }
  myCharts(data) {
    const myChart = echarts.init(this.chart);
    myChart.on('click', param => {
      const id = _.get(param, ['data', 'id']);
      if (id) {
        this.props.onClose();
      }
    });
    console.log(data);
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
