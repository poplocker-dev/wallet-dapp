import React       from 'react'
import { connect } from 'react-redux'
import Input       from 'ui/input'

import './create_or_link.css'

class CreateOrLink extends React.Component {
  constructor (props) {
    super(props);
    this.state = { name: '' };
  }

  render () {
    return (
      <div className="subview create-or-link-form">
        <div className="title">
          Connect Your Device
        </div>
        <Input
          autoComplete="off"
          spellCheck="false"
          name="smartlocker-name"
          label="Smart Locker Name:"
          size="32"
          onChange={this.handleInput.bind(this)}
          value={this.state.name} />
      </div>
    );
  }

  handleInput (e) {
    this.setState({ name: e.target.value });
  }
}

export default connect()(CreateOrLink);
