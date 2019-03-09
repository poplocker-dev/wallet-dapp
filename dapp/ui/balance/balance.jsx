import React         from 'react'
import { connect }   from 'react-redux'
import { rpc }       from 'lib/rpc_calls'
import { Preloader } from '@poplocker/react-ui'

import './balance.css'

class Balance extends React.Component {

  componentDidUpdate () {
    if (this.props.connection > 0)
      this.props.dispatch(rpc.getBalance());
  }

  render () {
    return (
      <div className="account-balance">
        <Preloader value={this.props.balance}>
          { this.props.balance } ETH
        </Preloader>
      </div>
    )
  }
}

export default connect(({ balance, connection }) => ({ balance, connection }))(Balance);
