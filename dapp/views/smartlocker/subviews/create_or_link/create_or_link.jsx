import React                                from 'react'
import { connect }                          from 'react-redux'
import { bindActionCreators }               from 'redux'
import { Button, Input, Blipping }          from '@poplocker/react-ui'
import { RegistrarContract }                from 'lib/contracts'
import { rpc }                              from 'lib/rpc_calls'
import { flags, showSendTransactionToasts } from 'lib/helpers'
import { addPendingTx }                     from 'lib/store/actions'
import ShhRpc                               from 'lib/whisper'
import { toast }                            from 'react-toastify'

import './create_or_link.css'

class CreateOrLinkSubview extends React.Component {
  constructor (props) {
    super(props);

    const { abi } = config.contracts.registrar;
    const { address } = props.locker.registrar;

    this.registrar = new RegistrarContract(abi, address);
    this.state = {
      lockerName: '',
      deviceName: '',
      badge: '',
      address: false
    };
  }

  render () {
    return (
      <div className="subview create-or-link-subview">
        <div className="title">
          Connect Your Device
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>

          <Input className="name"
            autoComplete="off"
            spellCheck="false"
            label="Smart Locker Name:"
            autoFocus={true}
            maxLength="32"
            badge={this.state.badge}
            badgeType={this.badgeType(this.state.badge)}
            onChange={this.handleLockerName.bind(this)}
            value={this.state.lockerName} />

          <Input className="device"
            autoComplete="off"
            spellCheck="false"
            label="Device Name:"
            maxLength="32"
            onChange={this.handleDeviceName.bind(this)}
            value={this.state.deviceName} />

          <div className="buttons--2row">
            <Button kind="alt" icon="arrow"
                    type={this.disabledFor('link')? 'button' : 'submit'}
                    disabled={this.disabledFor('link') || !this.state.deviceName}>
              Create Locker
            </Button>
            <Button icon="arrow-up"
                    type={this.disabledFor('create')? 'button' : 'submit'}
                    disabled={this.disabledFor('create') || !this.state.deviceName}>
              Link Device
            </Button>
          </div>
        </form>
      </div>
    );
  }

  disabledFor (badgeName) {
    return (
      this.badgeType(this.state.badge) == 'loading'
        || this.state.badge == badgeName
        || !this.state.badge
    );
  }

  badgeType (badge) {
    switch(badge) {
      case 'link':
        return 'info';
      case 'create':
        return 'valid';
      default:
        return 'loading'
    }
  }

  postLinkRequest (smartLocker, address, name) {
    return new ShhRpc(config.constants.SHH_URL, smartLocker.substr(0, 10))
      .post({ smartLocker, address, name, timeStamp: Date.now() })
  }

  // TODO: contract interaction is
  // local, but rpc.setLockerAddress
  // is not. Clean up this mixup
  // contracts and rpc should have consistent
  // interface
  handleLink (e) {
    e.preventDefault();

    const smartLockerAddress = this.state.address;
    this.postLinkRequest(smartLockerAddress, this.props.address, this.state.deviceName)
      .then(this.props.setLocker(smartLockerAddress))
      .then(this.props.updateLocker)

    if (!window.web3.utils.toBN(this.props.balance).isZero())
      toast.warning('While linked you will lose access to funds in your local account');
  }

  handleCreate (e) {
    e.preventDefault();

    const { lockerName, deviceName } = this.state;
    const { address } = this.props;

    this.registrar.createSmartLocker(lockerName, deviceName, address)
        .then(this.props.addPendingTx);

    flags.creatingLocker = lockerName;
    this.props.updateLocker();

    showSendTransactionToasts(this.props.balance);
  }

  handleLockerName (e) {
    const lockerName = e.target.value;

    if (lockerName) {
      this.setState({ lockerName, badge: <Blipping/> }, () => {
        this.registrar.getAddressDebounced(this.state.lockerName).then(address => {
          const badge = (address) ? 'link' : 'create';
          if (this.state.lockerName) this.setState({ badge, address });
        });
      });
    }
    else {
      this.setState({ lockerName, badge: '' });
    }
  }

  handleDeviceName (e) {
    this.setState({ deviceName: e.target.value });
  }

  handleSubmit (e) {
    if (!this.disabledFor('link')) {
      this.handleCreate(e);
    } else if (!this.disabledFor('create')) {
      this.handleLink(e);
    } else {
      e.preventDefault();
    }
  }
}

const mapState = ({ locker, address, balance }) => ({
  locker,
  address,
  balance
});

const mapDispatch = dispatch => ({
  setLocker: bindActionCreators(rpc.setSmartLockerAddress, dispatch),
  updateLocker: bindActionCreators(rpc.getSmartLockerState, dispatch),
  addPendingTx : bindActionCreators(addPendingTx, dispatch)
});

export default connect(mapState, mapDispatch)(CreateOrLinkSubview);
