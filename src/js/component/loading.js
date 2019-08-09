/**
 * 不
 */
import { Component } from 'react';
import _ from 'lodash';
import LoadingDraw from 'img/loadingDraw.gif';

class Loading extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="loading">
        <img src={LoadingDraw} alt="" />
      </div>
    );
  }
}

export default Loading;
