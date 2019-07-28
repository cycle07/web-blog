import { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class Header extends Component {
 constructor(props) {
   super(props);
 }
 render() {
   return (
     <div>header</div>
   )
 }
}