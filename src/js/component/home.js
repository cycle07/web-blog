import { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("main")
@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {
      main: { setting }
    } = this.props;
    document.title = setting.title;
    document.getElementById("favicon").setAttribute("href", setting.icon);
  }
  render() {
    const {
      main: { setting }
    } = this.props;
    const ch = window.document.body.offsetHeight;
    return (
      <div className="home">
        <div
          className="banner"
          style={{
            "background-image": `url(${setting.cover_image})`,
            height: `${ch}px`
          }}
        >
          <div className="desc">{`“${setting.description}”`}</div>
        </div>
        <div className="list" />
      </div>
    );
  }
}
