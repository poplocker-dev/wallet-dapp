import React                         from 'react'
import { connect }                   from 'react-redux'
import { bindActionCreators }        from 'redux'
import KeyList                       from './key_list'
import { Button }                    from '@poplocker/react-ui'
import devices                       from 'assets/devices.svg'
import { SmartLockerContract }       from 'lib/contracts'
import { showSendTransactionToasts } from 'lib/helpers'
import { selectAuthorizedKey,
         selectPendingKey,
         updatePendingKeys }         from 'lib/store/actions'
import ShhRpc                        from 'lib/whisper'

import './management.css'

class ManagementSubview extends React.Component {
  constructor (props) {
    super(props);

    const { abi } = config.contracts.smartLocker;
    const { smartLockerAddress } = this.props.locker;

    this.smartLocker = new SmartLockerContract(abi, smartLockerAddress);
  }

  componentDidMount () {
    this.subscribeToLinkRequests(this.queuePendingKey.bind(this));
  }

  subscribeToLinkRequests (callback) {
    new ShhRpc(config.constants.SHH_URL, this.props.locker.smartLockerAddress.substr(0, 10))
      .subscribe(callback);
  }

  queuePendingKey (key) {
    const { pendingKeys } = this.props.keys;
    this.props.updatePendingKeys([key, ...pendingKeys.filter(pendingKey => pendingKey.address != key.address)
                                                     .slice(0, 99)]);
  }

  onlyKey () {
    return this.props.locker.onlyKey && !this.props.keys.pendingKeys.length;
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
    } else if (this.props.keys.selectedKey.pending) {
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
    const key = this.props.keys.pendingKeys.find(pendingKey => pendingKey.address == this.props.keys.selectedKey.pending);
    this.smartLocker.addKey(key.address, key.name);
    this.props.selectPendingKey(null);
    showSendTransactionToasts(this.props.balance);
  }

  rejectPendingKey () {
    this.props.updatePendingKeys(this.props.keys.pendingKeys.filter(key => key.address != this.props.keys.selectedKey.pending));
    this.props.selectPendingKey(null);
  }

  shouldRemoveAuthorizedBeEnabled () {
    return this.props.keys.selectedKey.authorized && this.props.keys.selectedKey.authorized != this.props.locker.deviceAddress;
  }

  removeAuthorizedKey () {
    this.smartLocker.removeKey(this.props.keys.selectedKey.authorized);
    this.props.selectAuthorizedKey(null);
    showSendTransactionToasts(this.props.balance);
  }
}

const mapState = ({ locker, balance, keys }) => ({ locker, balance, keys });

const mapDispatch = dispatch => ({
  selectAuthorizedKey : bindActionCreators(selectAuthorizedKey, dispatch),
  selectPendingKey : bindActionCreators(selectPendingKey, dispatch),
  updatePendingKeys : bindActionCreators(updatePendingKeys, dispatch)
});

export default connect(mapState, mapDispatch)(ManagementSubview);
