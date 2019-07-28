import { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class Footer extends Component {
 constructor(props) {
   super(props);
 }
 render() {
   return (
     <div>Footer</div>
   )
 }
}