import React from 'react'
import { rpc } from 'lib/rpc_calls'

class RpcComponent extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch(rpc[this.get]);
  }
}

export default RpcComponent;
