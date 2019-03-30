import React                       from 'react'
import { connect }                 from 'react-redux'
import { bindActionCreators }      from 'redux'
import { Button, Input, Blipping } from '@poplocker/react-ui'
import { RegistrarContract }       from 'lib/contracts'
import { rpc }                     from 'lib/rpc_calls'

import './create_or_link.css'

class CreateOrLink extends React.Component {
  constructor (props) {
    super(props);
    // TODO: address of the registrar
    // should be provided by the extension
    this.registrar = new RegistrarContract(config.contracts.registrar);
    this.state = { name: '', badge: '', address: false };
  }

  render () {
    return (
      <div className="subview create-or-link">
        <div className="title">
          Connect Your Device
        </div>
        <form >

          <Input
            autoComplete="off"
            spellCheck="false"
            name="smartlocker-name"
            label="Smart Locker Name:"
            autoFocus={true}
            maxLength="32"
            badge={this.state.badge}
            badgeType={this.badgeType(this.state.badge)}
            onChange={this.handleInput.bind(this)}
            value={this.state.name} />

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
  }

  handleCreate (e) {
    e.preventDefault();
    const { name } = this.state;
    const { address, balance } = this.props;

    this.registrar
        .createSmartLocker(name, address, balance)
        .then(this.props.updateLocker);
  }

  handleInput (e) {
    const name = e.target.value;

    if (name) {
      this.setState({ name, badge: <Blipping/> }, () => {
        this.registrar.getAddressDebounced(this.state.name).then(address => {
          const badge = (address) ? 'link' : 'create';
          if (this.state.name) this.setState({ badge, address });
        });
      });
    }
    else {
      this.setState({ name, badge: '' });
    }

  }
}

const mapState = ({ locker, balance, address }) => ({
  locker,
  balance,
  address
});

const mapDispatch = dispatch => ({
  setLocker: bindActionCreators(rpc.setSmartLockerAddress, dispatch),
  updateLocker: bindActionCreators(rpc.getSmartLockerState, dispatch)
});

export default connect(mapState, mapDispatch)(CreateOrLink);
