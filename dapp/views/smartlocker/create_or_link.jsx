import React       from 'react'
import { connect } from 'react-redux'
import { Button }  from '@poplocker/react-ui'
import Input       from 'ui/input'

import { RegistrarContract } from 'lib/contracts'

import './create_or_link.css'

class CreateOrLink extends React.Component {
  constructor (props) {
    super(props);
    // TODO: find better place for it
    // TODO: address of the registrar
    // should be provided by the extension
    this.registrar = new RegistrarContract(config.contracts.registrar);
    this.state = { name: '' };
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

  handleInput (e) {
    this.setState({ name: e.target.value }, () => {
      // only log for now
      this.registrar.getAddress(this.state.name).then(console.log);
    });
  }
}

export default connect(({ locker }) => ({ locker }))(CreateOrLink);
