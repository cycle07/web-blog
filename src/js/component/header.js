import { Component } from "react";
import { observer, inject } from "mobx-react";
import _ from "lodash";

@inject("main")
@observer
export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      main: { setting }
    } = this.props;
    return (
      <header>
        <div className="logo">
          <img src={setting.logo} alt="" />
        </div>
        <div className="inner">
          <ul>
            {_.map(setting.navigation, item => (
              <li>{_.upperCase(item.label)}</li>
            ))}
          </ul>
        </div>
      </header>
    );
  }
}
