import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import { RegistrarContract }  from 'lib/contracts'
import { rpc }                from 'lib/rpc_calls'
import { flags }              from 'lib/helpers'
import Waiting                from '../waiting'

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
      <Waiting message={this.message()}
               onCancel={this.handleCancel.bind(this)}/>
    );
  }

  message () {
    return `Deploying ${this.props.name} contract. Please sign the transaction and wait to be mined.`
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

export default connect(mapDispatch)(DeployingSubview);
