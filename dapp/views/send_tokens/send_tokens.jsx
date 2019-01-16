import React       from 'react'
import { connect } from 'react-redux'
import { rpc }     from 'lib/rpc_calls'
import Input from 'ui/input'
import Button from 'ui/button'

import './send_tokens.css'

class SendTokens extends React.Component {
  constructor(props) {
    super(props);
    this.state = { amount: 0, to: null }
  }

  send(to, amount) {
    this.props.dispatch(rpc.sendTokens(to, amount));
  }
  
  handleTo(e) {
    this.setState({ to: e.target.value });
  }

  handleAmount(e) {
    this.setState({ amount: e.target.value });
  }
  
  shouldBeEnabled() {
    return this.state.amount && this.state.to;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.shouldBeEnabled)
      this.send(this.state.to, this.state.amount);
  }

  render () {
    return (
      <form className="send-panel" onSubmit={this.handleSubmit.bind(this)}>
        <Input name="to" label="To:" onChange={this.handleTo.bind(this)} value={this.state.address}/>
        <Input name="amount" label="Amount" onChange={this.handleAmount.bind(this)} value={this.state.amount}/>
        <Button icon="arrow-up" disabled={!this.shouldBeEnabled()}>Send Money</Button>
      </form>
    )
  }
}

export default connect()(SendTokens);
