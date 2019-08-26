/**
 * 不
 */
import { Component } from 'react';
import _ from 'lodash';

export default class Page extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { page, total, goPreview, goNext } = this.props;
    return (
      <div className="page">
        <div className="go" onClick={goPreview}>
          {page > 1 && '< Preview'}
        </div>
        <div>{`${page} of ${total}`}</div>
        <div className="go" onClick={goNext}>
          {page < total && 'Next >'}
        </div>
      </div>
    );
  }
}
