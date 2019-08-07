import { Component } from "react";

export default class Li extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  render() {
    const {
      data
    } = this.props;
    console.log(data);
    if (!data) return null;
    return (
      <div className="list_item">
        <div className='img' />
        <div className='item_tag' >{}</div>
        <div className='item_title' >{data.title}</div>
        <div className='item_sample' >{data.excerpt}</div>
        <div className='info' >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
