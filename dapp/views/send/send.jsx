import React             from 'react'
import Input             from 'ui/input'
import { connect }       from 'react-redux'
import { rpc }           from 'lib/rpc_calls'
import { Button }        from '@poplocker/react-ui'
import { CSSTransition } from 'react-transition-group'

import './send.css'

class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = { amount: 0, to: null }
  }

  send(to, amount) {
    this.props.dispatch(rpc.send(to, amount));
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

  handleBack() {
    window.history.back();
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
          <div className="send-title">Send ETH</div>
          <Input className="send-to" name="to" label="To" onChange={this.handleTo.bind(this)} value={this.state.address}/>
          <Input name="amount" label="Amount" onChange={this.handleAmount.bind(this)} value={this.state.amount}/>
          <div className="back-send">
            <Button type="button" kind="light" icon="arrow" onClick={this.handleBack.bind(this)}>Back</Button>
            <Button icon="arrow-up" disabled={!this.shouldBeEnabled()}>Send</Button>
          </div>
        </form>
      </CSSTransition>
    )
  }
}

export default connect()(Send);
