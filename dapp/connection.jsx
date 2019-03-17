import React         from 'react'
import { connect }   from 'react-redux'
import { rpc }       from 'lib/rpc_calls'
import { Bouncing, Preloader }  from '@poplocker/react-ui'

class Connection extends React.Component {
  componentDidMount() {
    if (window.web3.givenProvider) {
      this.props.dispatch(rpc.getAddress());
      this.pollForStatus();
      this.timer = setInterval(() => this.pollForStatus(), 2000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  pollForStatus() {
    if (this.props.address) {
      this.props.dispatch(rpc.isListening());
      this.props.dispatch(rpc.getBalance());
    }
  }

  noAddress() {
    return (
      <div className="no-address">
        No Address!
      </div>
    )
  }

  waitOrNoAddress () {
    if (this.props.address)
      return Bouncing;
    else
      return this.noAddress;
  }

  render () {
    return (
      <div className="connection">
        <Preloader value={this.props.connection != -1} loader={this.waitOrNoAddress()}>
          { this.props.children }
        </Preloader>
      </div>
    )
  }
}

export default connect(({ address, connection }) => ({ address, connection }))(Connection);
