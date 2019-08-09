import { Component } from 'react';
import { observer, inject } from 'mobx-react';
import classnames from 'classnames';
import _ from 'lodash';
import Tiao from 'img/pattern2@2x.gif';

@inject('main')
@observer
export default class ShiningUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false
    };
    // this.arr = ['10-15', '16-24', '40-60', '50-75'];
    this.random = this.getRandomInt(1, 75);
    // [this.heng, this.shu] = _.shuffle(this.arr)[0].split('-');
    [this.heng, this.shu] = [this.random * 1, this.random * 2];
  }
  getRandomInt = (min, max) =>
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
    Math.ceil(min);
  componentWillUpdate() {
    if (!this.state.done) {
      const {
        children,
        main: { touchTop }
      } = this.props;
      if (this.shiningUnit.offsetTop - touchTop <= 700) {
        this.setState({
          done: true
        });
      }
    }
  }
  render() {
    const {
      children,
      className,
      main: { touchTop }
    } = this.props;
    const { done } = this.state;
    const show = done
      ? false
      : this.shiningUnit
      ? this.shiningUnit.offsetTop - touchTop > 700
      : true;
    const classes = classnames({
      shining_wrap: show,
      [className]: true
    });
    return (
      <span
        className={classes}
        style={
          show
            ? {
                backgroundImage: `url(${Tiao})`,
                backgroundSize: `${this.heng}px ${this.shu}px`
              }
            : {}
        }
        onScroll={e => {
          console.log(3123);
        }}
        ref={e => {
          this.shiningUnit = e;
        }}
      >
        {children}
      </span>
    );
  }
}
