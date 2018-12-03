import React        from 'react'
import { connect }  from 'react-redux'
import { rpc }      from 'lib/rpc_calls'

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
      <div className="balance">
        { this.props.balance }
      </div>
    )
  }
}

export default connect(({ balance, connected }) => ({ balance, connected }))(Balance);
