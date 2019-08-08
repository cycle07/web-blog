import { Component } from "react";
import _ from "lodash";
import { readingTime } from "helpers/helpers";
import { getDate } from "helpers/time-deal";
import ShiningUnit from "./shining";

export default class Li extends Component {
  constructor(props) {
    super(props);
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
          />
        )}
        <div className="inner">
          <div className="item_tag">
            {_.map(data.tags, item => (
              <span>{item.name}</span>
            ))}
          </div>
          <div className="item_title">
            <ShiningUnit>{data.title}</ShiningUnit>
          </div>
          <div className="item_sample">
            <ShiningUnit>
              <span className="content">{data.excerpt}</span>
              <span className="rm">read more</span>
            </ShiningUnit>
          </div>
          <div className="info">
            <ShiningUnit>{getDate(data.updated_at)}</ShiningUnit>
            <ShiningUnit>{data.authors[0].name}</ShiningUnit>
            <ShiningUnit>
              {readingTime(data, {
                minute: "1 minute read.",
                minutes: "% minutes read."
              })}
            </ShiningUnit>
          </div>
        </div>
      </div>
    );
  }
}
