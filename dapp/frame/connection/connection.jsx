import React                      from 'react'
import { connect }                from 'react-redux'
import { rpc }                    from 'lib/rpc_calls'
import { Bouncing }               from '@poplocker/react-ui'
import { NoAddress, NoExtension } from './no_connection'

class Connection extends React.Component {
  componentDidMount() {
    if (this.extensionInstalled()) {
      this.startPolling();
      // legacy 1102 - for web3 browsers that don't support lazy connection requests
      if (window.ethereum) window.ethereum.enable();
    }
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
    this.props.dispatch(rpc.getBalance(this.props.address));
  }

  failOrWait () {
    if (!this.extensionInstalled())
      return <NoExtension/>

    else if (!this.props.address)
      return <NoAddress/>

    else if (this.props.connection == -1)
      return <Bouncing/>

    else
      return this.props.children;
  }

  render () {
    return this.failOrWait();
  }
}

export default connect(({ address, connection }) => ({ address, connection }))(Connection);
