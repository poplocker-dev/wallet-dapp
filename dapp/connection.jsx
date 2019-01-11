import React       from 'react'
import { connect } from 'react-redux'
import { rpc }     from 'lib/rpc_calls'

class Connection extends React.Component {
  componentDidMount() {
    this.props.dispatch(rpc.getAddress());
    this.props.dispatch(rpc.isListening());
  }

  render () {
    if (!this.props.connected)
      return (
        <p>
          No connection!
        </p>
      )
    else if (this.props.address.length > 0)
      return this.props.children;
    else return (
      <p>
        No Address!
      </p>
    )
  }
}

export default connect(({ address, connected }) => ({ address, connected }))(Connection);
