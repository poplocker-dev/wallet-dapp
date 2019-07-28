import React                         from 'react'
import { connect }                   from 'react-redux'
import { bindActionCreators }        from 'redux'
import KeyList                       from './key_list'
import { Button }                    from '@poplocker/react-ui'
import devices                       from 'assets/devices.svg'
import { SmartLockerContract }       from 'lib/contracts'
import { showSendTransactionToasts } from 'lib/helpers'
import { rpc }                       from 'lib/rpc_calls'
import { selectAuthorizedKey,
         selectPendingKey }          from 'lib/store/actions'

import './management.css'

class ManagementSubview extends React.Component {
  constructor (props) {
    super(props);

    const { abi } = config.contracts.smartLocker;
    const { smartLockerAddress } = this.props.locker;

    this.smartLocker = new SmartLockerContract(abi, smartLockerAddress);
  }

  onlyKey () {
    return this.props.locker.keys.length < 2 && !this.props.locker.requests.length;
  }

  pendingKeySelected () {
    return this.props.selectedKey.pending &&
           this.props.locker.requests.some(request => this.props.selectedKey.pending == request.address);
  }

  keyList () {
    if (this.onlyKey()) {
      return this.onlyKeyWarning();
    } else {
      return (
        <KeyList smartLocker={this.smartLocker}/>
      )
    }
  }

  buttons () {
    if (this.onlyKey()) {
      return null;
    } else if (this.pendingKeySelected()) {
      return (
        <div className="buttons--2row buttons">
          <Button kind="reject"
                  icon="close"
                  onClick={this.rejectPendingKey.bind(this)}>
            Reject Device
          </Button>
          <Button kind="alt"
                  icon="tick"
                  onClick={this.authorizePendingKey.bind(this)}>
            Authorize Device
          </Button>
        </div>
      )
    } else {
      return (
        <div className="buttons--1row buttons">
          <Button kind="reject"
                  icon="close"
                  disabled={!this.shouldRemoveAuthorizedBeEnabled()}
                  onClick={this.removeAuthorizedKey.bind(this)}>
            Remove Device
          </Button>
        </div>
      )
    }
  }

  onlyKeyWarning () {
    return (
      <div className="only-key">
        <img alt="Devices" src={devices} />
        <div className="only-key-warning">
          <p>
            You have no other devices connected to your Smart Locker.
          </p>
          <p>
            Link another device for backup and recovery purposes.
          </p>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className="subview management-subview">
        { this.keyList() }
        { this.buttons() }
      </div>
    )
  }    

  authorizePendingKey () {
    const key = this.props.locker.requests.find(request => this.props.selectedKey.pending == request.address);
    this.smartLocker.addKey(key.address, key.name);
    this.props.selectPendingKey(null);
    showSendTransactionToasts(this.props.balance);
  }

  rejectPendingKey () {
    this.props.rejectPendingKey(this.props.selectedKey.pending)
      .then(this.props.updateLocker);
    this.props.selectPendingKey(null);
  }

  shouldRemoveAuthorizedBeEnabled () {
    return this.props.selectedKey.authorized &&
           this.props.selectedKey.authorized != this.props.locker.deviceAddress &&
           this.props.locker.keys.some(key => this.props.selectedKey.authorized == key.address);
  }

  removeAuthorizedKey () {
    this.smartLocker.removeKey(this.props.selectedKey.authorized);
    this.props.selectAuthorizedKey(null);
    showSendTransactionToasts(this.props.balance);
  }
}

const mapState = ({ locker, balance, selectedKey }) => ({ locker, balance, selectedKey });

const mapDispatch = dispatch => ({
  selectAuthorizedKey : bindActionCreators(selectAuthorizedKey, dispatch),
  selectPendingKey : bindActionCreators(selectPendingKey, dispatch),
  rejectPendingKey: bindActionCreators(rpc.removeKeyRequest, dispatch),
  updateLocker: bindActionCreators(rpc.getSmartLockerState, dispatch)
});

export default connect(mapState, mapDispatch)(ManagementSubview);
