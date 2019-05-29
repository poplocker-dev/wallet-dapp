import React                         from 'react'
import { connect }                   from 'react-redux'
import { bindActionCreators }        from 'redux'
import KeyList                       from './key_list'
import { Button, Input }             from '@poplocker/react-ui'
import devices                       from 'assets/devices.svg'
import { SmartLockerContract }       from 'lib/contracts'
import { showSendTransactionToasts } from 'lib/helpers'
import { addPendingTx }              from 'lib/store/actions'

import './management.css'

class ManagementSubview extends React.Component {
  constructor (props) {
    super(props);

    const { abi } = config.contracts.smartLocker;
    const { address } = this.props;

    this.state = { selectedKey: null, key: '', error: '' };
    this.smartLocker = new SmartLockerContract(abi, address);
  }

  keyList() {
    if (this.props.locker.onlyKey) {
      return this.onlyKeyWarning();
    } else {
      return (
        <KeyList smartLocker={this.smartLocker}
                 selectedKey={this.state.selectedKey}
                 handleSelect={this.handleSelect.bind(this)} />
      )
    }
  }

  buttons() {
    if (this.props.locker.onlyKey) {
      return null;
    } else if (false) { // TODO: pending keys here
      return (        
        <div className="buttons--2row buttons">
          <Button kind="reject" icon="close">
            Reject Device
          </Button>
          <Button kind="alt" icon="tick">
            Authorize Device
          </Button>
        </div>
      )
    } else {
      return (        
        <div className="buttons--1row buttons">
          <Button kind="reject"
                  icon="close"
                  disabled={!this.state.selectedKey}
                  onClick={this.removeKey.bind(this)}>
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
        <form className="todo-form" onSubmit={this.handleAuth.bind(this)}>
          <Input
            autoComplete="off"
            spellCheck="false"
            label="Device Address:"
            autoFocus={true}
            onChange={this.handleKeyInput.bind(this)}
            error={this.state.error}
            value={this.state.key} />

          <Button tabIndex={-1}
                  type="button"
                  icon="tick"
                  disabled={!this.state.key}
                  onClick={this.handleAuth.bind(this)}>
            Authorize
          </Button>
        </form>
      </div>
    )
  }    

  handleSelect (e, address) {
    e.preventDefault();
    this.setState( {selectedKey: address });
  }

  removeKey () {
    this.smartLocker.removeKey(this.state.selectedKey);
    this.setState({ selectedKey: null });
    showSendTransactionToasts(this.props.balance);
  }

  handleKeyInput (e) {
    this.setState({ error: '' });
    this.setState({ key: e.target.value });
  }

  handleAuth (e) {
    e.preventDefault();
    this.smartLocker
        .addKey(this.state.key, `Device-${this.state.key.slice(0,4)}`)
    this.setState({ key: '', error: '' });
    showSendTransactionToasts(this.props.balance);
  }
}

const mapState = ({ locker, address, balance }) => ({
  locker,
  address,
  balance
});

const mapDispatch = dispatch => ({
  addPendingTx : bindActionCreators(addPendingTx, dispatch)
});

export default connect(mapState, mapDispatch)(ManagementSubview);
