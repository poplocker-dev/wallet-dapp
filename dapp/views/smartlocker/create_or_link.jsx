import React                       from 'react'
import { connect }                 from 'react-redux'
import { Button, Input, Bouncing } from '@poplocker/react-ui'
import { RegistrarContract }       from 'lib/contracts'

import './create_or_link.css'

class CreateOrLink extends React.Component {
  constructor (props) {
    super(props);
    // TODO: find better place for it
    // TODO: address of the registrar
    // should be provided by the extension
    this.registrar = new RegistrarContract(config.contracts.registrar);
    this.state = { name: '', badge: '' };
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
            size="32"
            badge={this.state.badge}
            badgeType={this.badgeType(this.state.badge)}
            onChange={this.handleInput.bind(this)}
            value={this.state.name} />

        </form>
        <div className="buttons--2row">
          <Button kind="alt" icon="arrow">Create Locker</Button>
          <Button icon="arrow-up">Link Device</Button>
        </div>
      </div>
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

  handleInput (e) {
    this.setState({ name: e.target.value, badge: '...' }, () => {
      if (this.state.name) {
        this.registrar.getAddressDebounced(this.state.name).then(addr => {
          addr ? this.setState({ badge: 'link' }) : this.setState({ badge: 'create' });
        });
      }
      else {
        this.setState({ badge: '' });
      }
    });
  }
}

export default connect(({ locker }) => ({ locker }))(CreateOrLink);
