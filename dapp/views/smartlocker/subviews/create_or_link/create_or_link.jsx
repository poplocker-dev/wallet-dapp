import React                                from 'react'
import { connect }                          from 'react-redux'
import { bindActionCreators }               from 'redux'
import { Button, Input, Blipping }          from '@poplocker/react-ui'
import { RegistrarContract }                from 'lib/contracts'
import { rpc }                              from 'lib/rpc_calls'
import { flags, showSendTransactionToasts } from 'lib/helpers'
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

          <Input
            autoComplete="off"
            spellCheck="false"
            name="smartlocker-name"
            label="Smart Locker Name:"
            autoFocus={true}
            maxLength="32"
            badge={this.state.badge}
            badgeType={this.badgeType(this.state.badge)}
            onChange={this.handleLockerName.bind(this)}
            value={this.state.lockerName} />

          <Input
            autoComplete="off"
            spellCheck="false"
            name="smartlocker-device"
            label="Device Name:"
            maxLength="32"
            disabled={this.state.badge == 'link'}
            onChange={this.handleDeviceName.bind(this)}
            value={this.state.deviceName} />

        </form>
        <div className="buttons--2row">
          <Button kind="alt" icon="arrow"
                  onClick={this.handleCreate.bind(this)}
                  disabled={this.disabledFor('link')}>
            Create Locker
          </Button>
          <Button icon="arrow-up"
                  onClick={this.handleLink.bind(this)}
                  disabled={this.disabledFor('create')}>
            Link Device
          </Button>
        </div>
      </div>
    );
  }

  disabledFor(badgeName) {
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

  // TODO: contract interaction is
  // local, but rpc.setLockerAddress
  // is not. Clean up this mixup
  // contracts and rpc should have consistent
  // interface
  handleLink (e) {
    e.preventDefault();

    this.props.setLocker(this.state.address)
        .then(this.props.updateLocker);

    if (!window.web3.utils.toBN(this.props.balance).isZero())
      toast.warning('While linked you will lose access to funds in your local account');
  }

  handleCreate (e) {
    e.preventDefault();

    const { lockerName, deviceName } = this.state;
    const { address } = this.props;

    this.registrar
        .createSmartLocker(lockerName, deviceName, address);

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
  updateLocker: bindActionCreators(rpc.getSmartLockerState, dispatch)
});

export default connect(mapState, mapDispatch)(CreateOrLinkSubview);
