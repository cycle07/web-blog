import { Component } from 'react';
import _ from 'lodash';
import { readingTime } from 'helpers/helpers';
import { getDate } from 'helpers/time-deal';

export default class Li extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div className="list_item">
        {data.feature_image && (
          <div
            className="img"
            style={{ backgroundImage: `url(${data.feature_image})` }}
          />
        )}
        <div className="inner">
          <div className="item_tag">
            {_.map(data.tags, item => (
              <span>{item.name}</span>
            ))}
          </div>
          <div className="item_title">{data.title}</div>
          <div className="item_sample">
            <span className="content">{data.excerpt}</span>
            <span className="rm">read more</span>
          </div>
          <div className="info">
            <span>{getDate(data.updated_at)}</span>
            <span>{data.authors[0].name}</span>
            <span>
              {readingTime(data, {
                minute: '1 minute read.',
                minutes: '% minutes read.'
              })}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
