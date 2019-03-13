import React from 'react'
import { connect } from 'react-redux'
import { Button } from '@poplocker/react-ui'
import { rpc } from 'lib/rpc_calls'

class Locker extends React.Component {
  componentDidMount () {
    this.props.dispatch(rpc.getSmartLockerState());
  }

  render () {
    return (
      <div className="locker-button">
        <Button>{ this.props.locker.status }</Button>
      </div>
    )
  }
}

export default connect(({ locker }) => ({ locker }))(Locker);
