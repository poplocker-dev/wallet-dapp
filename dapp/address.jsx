import React        from 'react'
import { connect }  from 'react-redux'
import { rpc }      from 'lib/rpc_calls'

class Address extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.connected)
      this.props.dispatch(rpc.getAddress());
  }
  render () {
    return (
      <div className="address">
        { this.props.address }
      </div>
    )
  }
}

export default connect(({ address, connected }) => ({ address, connected }))(Address);
