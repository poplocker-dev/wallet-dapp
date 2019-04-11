import React                  from 'react'
import { bindActionCreators } from 'redux'
import { Button, Spinning }   from '@poplocker/react-ui'
import { connect }            from 'react-redux'
import { RegistrarContract }  from 'lib/contracts'
import { rpc }                from 'lib/rpc_calls'
import { flags }              from 'lib/helpers'

import './deploying.css'

class DeployingSubview extends React.Component {
  constructor (props) {
    super(props);
    // TODO: it could be setup during init
    // web3 so no duplication, and web3 is
    // initialized beforehand
    this.registrar = new RegistrarContract(config.contracts.registrar);
  }

  componentDidMount () {
    this.startPolling();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // TODO: create poller helper
  // with timer queue and stuff
  // so we don't need to manually
  // set and unset them
  startPolling() {
    this.pollForAddress();
    this.timer = setInterval(() => this.pollForAddress(), 5000);
  }

  render () {
    return (
      <div className="subview deploying-subview">
        <Spinning/>
        <div className="message">
          { `Deploying ${this.props.name} contract. `}
          Please sign the transaction and wait to be mined.
        </div>
          <Button tabIndex={-1}
                  type="button"
                  icon="close"
                  kind="reject"
                  onClick={this.handleCancel.bind(this)}>
            Cancel
          </Button>
      </div>
    );
  }

  pollForAddress () {
    this.registrar.getAddress(this.props.name).then(address => {
      if (address) {
        flags.creatingLocker = false;
        return this.props.setLocker(address)
                   .then(this.props.updateLocker);
      }
      else return null;
    })
  }

  handleCancel () {
    flags.creatingLocker = false;
    this.props.setLocker(null).then(this.props.updateLocker);
  }
}

const mapDispatch = dispatch => ({
  setLocker: bindActionCreators(rpc.setSmartLockerAddress, dispatch),
  updateLocker: bindActionCreators(rpc.getSmartLockerState, dispatch)
});

export default connect(({ locker }) => ({ locker }), mapDispatch)(DeployingSubview);
