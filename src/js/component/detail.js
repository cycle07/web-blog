import { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class Detail extends Component {
 constructor(props) {
   super(props);
 }
 render() {
   return (
     <div>Detail</div>
   )
 }
}