import { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Tag from './tag';
import _ from 'lodash';

@inject('main', 'mainAction')
@observer
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(label) {
    const { mainAction } = this.props;
    if (label === 'Tag') {
      mainAction.switchTag();
    }
  }
  render() {
    const {
      main: { setting, showTag }
    } = this.props;
    return (
      <header>
        <div className="logo">
          <img src={setting.logo} alt="" />
        </div>
        <div className="inner">
          <ul>
            {_.map(setting.navigation, item => (
              <li>
                <span
                  onClick={() => {
                    this.handleClick(item.label);
                  }}
                >
                  {_.upperCase(item.label)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {showTag && <Tag />}
      </header>
    );
  }
}
