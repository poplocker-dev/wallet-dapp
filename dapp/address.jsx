import React from 'react'
import { connect } from 'react-redux'
import { rpc } from 'lib/rpc_calls'

class Address extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch(rpc.address);
  }

  render () {
    return (
      <div className="address">
        { this.props.address }
      </div>
    )
  }
}

export default connect(({ address }) => ({ address }))(Address);
