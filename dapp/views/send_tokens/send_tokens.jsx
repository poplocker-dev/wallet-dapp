import React       from 'react'
import Input       from 'ui/input'
import { connect } from 'react-redux'
import { rpc }     from 'lib/rpc_calls'
import { Button }  from '@poplocker/react-ui'

import { CSSTransition } from 'react-transition-group'

import './send_tokens.css'

class SendView extends React.Component {
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
      <CSSTransition timeout={500} classNames="showup" appear={true} in={true}>
        <form className="send-panel" onSubmit={this.handleSubmit.bind(this)}>
          <Input name="to" label="To:" onChange={this.handleTo.bind(this)} value={this.state.address}/>
          <Input name="amount" label="Amount" onChange={this.handleAmount.bind(this)} value={this.state.amount}/>
          <Button icon="arrow-up" disabled={!this.shouldBeEnabled()}>Send</Button>
        </form>
      </CSSTransition>
    )
  }
}

export default connect()(SendView);
