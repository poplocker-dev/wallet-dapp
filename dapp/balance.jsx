import React from 'react'
import { connect } from 'react-redux'

import RpcComponent from './rpc_component'

class Balance extends RpcComponent {
  constructor (props) {
    super(props);
    this.get = 'balance';
  }

  render () {
    return (
      <div className="balance">
        { this.props.balance }
      </div>
    )
  }
}

export default connect(({ balance }) => ({ balance }))(Balance);
