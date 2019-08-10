import { Component } from 'react';
import _ from 'lodash';
import { readingTime } from 'helpers/helpers';
import { getDate } from 'helpers/time-deal';
import ShiningUnit from './shining';
import Icon from 'public/icon';

export default class Li extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick() {
    const { data, history } = this.props;
    history.push(`/detail/${data.slug}`);
  }
  componentDidMount() {}
  render() {
    const { data } = this.props;
    // console.log(data);
    return (
      <div className="list_item">
        {data.feature_image && (
          <div
            className="img"
            style={{ backgroundImage: `url(${data.feature_image})` }}
            onClick={this.handleOnClick}
          />
        )}
        <div className="inner">
          <div className="item_tag">
            {_.map(data.tags, item => (
              <span>{item.name}</span>
            ))}
          </div>
          <div className="item_title" onClick={this.handleOnClick}>
            <ShiningUnit className="item_title">{data.title}</ShiningUnit>
          </div>
          <div className="item_sample">
            <ShiningUnit>
              <span className="content">{data.excerpt}</span>

              <span className="rm" onClick={this.handleOnClick}>
                read more
              </span>
            </ShiningUnit>
          </div>
          <div className="info">
            <ShiningUnit>
              <Icon type="calendar" />
              {getDate(data.updated_at)}
            </ShiningUnit>
            <ShiningUnit>
              <Icon type="user" />
              {data.authors[0].name}
            </ShiningUnit>
            <ShiningUnit>
              <Icon type="time" />
              {readingTime(data, {
                minute: '1 minute read.',
                minutes: '% minutes read.'
              })}
            </ShiningUnit>
          </div>
        </div>
      </div>
    );
  }
}
