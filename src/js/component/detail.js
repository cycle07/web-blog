import { Component } from 'react';
import { getDate } from 'helpers/time-deal';
import { observer, inject } from 'mobx-react';

@inject('main', 'mainAction')
@observer
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      th: 0
    };
    // this.cw = window.document.body.offsetWidth;
    // this.ch = window.document.body.offsetHeight;
    // this.ch = 640;
    // this.bh = (this.cw / 16) * 9;
    const {
      mainAction: { getPostDetail }
    } = this.props;
    getPostDetail(this.props.match.params.slug).then(res => {
      this.setState({
        data: res.posts[0]
      });
    });
  }
  componentDidUpdate() {
    if (this.state.th === 0) {
      this.setState({
        th: this.bannerDom.clientHeight
      });
    }
  }
  render() {
    const { data, th } = this.state;
    if (!data) return null;
    return (
      <div className="detail">
        <div
          className="banner"
          style={{
            backgroundImage: `url(${data.feature_image})`,
            height: `${th}px`
          }}
        >
          <div className="mask_gaosi" />
          <div className="banner_wrap">
            <div
              className="banner_inner"
              ref={e => {
                this.bannerDom = e;
              }}
            >
              <div className="title">{data.title}</div>
              <div className="img_wrap">
                <div className="date">{getDate(data.updated_at)}</div>
                <div
                  className="img"
                  style={{
                    backgroundImage: `url(${data.feature_image})`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="banner"
          style={{
            backgroundImage: `url(${data.feature_image})`,
            height: `${(this.cw / 16) * 9}px`
          }}
        /> */}
        <div className="inner" style={{ paddingTop: `${this.ch}px` }}>
          <div className="inner_left" />
          <div className="inner_right">
            <div className="info">{data.title}</div>
          </div>
        </div>
      </div>
    );
  }
}
