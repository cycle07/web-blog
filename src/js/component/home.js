import { Component } from 'react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
import Li from './li';

@inject('main', 'mainAction')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.initList();
    console.log(1213);
  }
  initList() {
    const { mainAction } = this.props;
    mainAction.getPostList().then(res => {
      mainAction.saveHandle('homelist', res.posts);
    });
  }
  componentDidMount() {}
  render() {
    const {
      main: { setting, homelist }
    } = this.props;
    const ch = window.document.body.offsetHeight;
    return (
      <div className="home">
        <div
          className="banner"
          style={{
            'background-image': `url(${setting.cover_image})`,
            height: `${ch}px`
          }}
        >
          <div className="desc">{`“${setting.description}”`}</div>
        </div>
        {homelist && (
          <ul className="list">
            {_.map(toJS(homelist), item => (
              <Li data={item} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}
