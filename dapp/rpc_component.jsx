import React from 'react'
import {rpc} from 'lib/rpc_calls'

class RpcComponent extends React.Component {
  constructor (props) {
    super(props);
    this.name   = this.constructor.name;
    this.getter = rpc['get' + this.name];
    this.sender = rpc[this.name.charAt(0).toLowerCase() + this.name.slice(1)];
  }

  send (value) {
    if (this.sender)
      this.props.dispatch(this.sender(value));
  }

  componentDidMount () {
    if (this.getter)
      this.props.dispatch(this.getter());
  }
}

export default RpcComponent;
