import { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class Home extends Component {
 constructor(props) {
   super(props);
 }
 render() {
   return (
     <div>Home</div>
   )
 }
}