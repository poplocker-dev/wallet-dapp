import React         from 'react'
import { connect }   from 'react-redux'
import { rpc }       from 'lib/rpc_calls'
import { Bouncing }  from '@poplocker/react-ui'

class Connection extends React.Component {
  componentDidMount() {
    if (this.extensionInstalled())
      this.startPolling();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  extensionInstalled () {
    return !!window.web3.givenProvider;
  }

  startPolling() {
    this.pollForStatus();
    this.timer = setInterval(() => this.pollForStatus(), 2000);
  }

  pollForStatus() {
    this.props.dispatch(rpc.getAddress());
    this.props.dispatch(rpc.isListening());
    this.props.dispatch(rpc.getBalance());
  }

  noAddress() {
    return (
      <div className="no-address">
        Please generate address.
      </div>
    )
  }

  noExtension() {
    return (
      <div className="no-address">
        Please install extension and reload.
      </div>
    )
  }

  failOrWait () {
    if (!this.extensionInstalled())
      return this.noExtension();
    else if (!this.props.address)
      return this.noAddress();
    else if (this.props.connection == -1)
      return (<Bouncing/>)
    else
      return this.props.children;
  }

  render () {
    return (
      <div className="connection">
        { this.failOrWait() }
      </div>
    )
  }
}

export default connect(({ address, connection }) => ({ address, connection }))(Connection);
