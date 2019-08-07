import { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import ServerDataForm from './data';

@inject('main', 'mainAction')
@observer
export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const { mainAction } = this.props;
    mainAction.getTagList();
  }
  handleClick(e) {
    const { mainAction } = this.props;
    if (!e || e.target.className === 'tag') {
      mainAction.switchTag();
    }
  }
  render() {
    const {
      main: { taglist }
    } = this.props;
    return (
      <div
        className="tag"
        style={{ height: `${window.document.body.offsetHeight}px` }}
        onClick={this.handleClick}
      >
        <div className="echarts">
          {taglist && <ServerDataForm data={toJS(taglist)} onClose={() => this.handleClick()} />}
        </div>
      </div>
    );
  }
}
