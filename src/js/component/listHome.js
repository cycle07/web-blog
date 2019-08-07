import { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class ListHome extends Component {
 constructor(props) {
   super(props);
 }
 render() {
   return (
     <div>ListHome</div>
   )
 }
}