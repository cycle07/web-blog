import { Component } from "react";
import { observer, inject } from "mobx-react";
import classnames from "classnames";
import _ from "lodash";
import Tiao from "img/pattern2@2x.gif";

@inject("main")
@observer
export default class ShiningUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false
    };
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
      if (this.shiningUnit.offsetTop - touchTop <= 800) {
        this.setState({
          done: true
        });
      }
    }
  }
  render() {
    const {
      children,
      main: { touchTop }
    } = this.props;
    const { done } = this.state;
    const show = done
      ? false
      : this.shiningUnit
      ? this.shiningUnit.offsetTop - touchTop > 800
      : true;
    const classes = classnames({
      shining_wrap: show
    });
    return (
      <span
        className={classes}
        style={
          show
            ? {
                backgroundImage: `url(${Tiao})`,
                backgroundSize: `${this.getRandomInt(
                  1,
                  200
                )}px ${this.getRandomInt(1, 200)}px`
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
