import React        from 'react'
import { connect }  from 'react-redux'
import { rpc }      from 'lib/rpc_calls'

import './balance.css'

class Balance extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate () {
    if (this.props.connected)
      this.props.dispatch(rpc.getBalance());
  }

  render () {
    return (
      <div className="account-balance">
        { this.props.balance } ETH
      </div>
    )
  }
}

export default connect(({ balance, connected }) => ({ balance, connected }))(Balance);
