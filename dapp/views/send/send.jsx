import React                         from 'react'
import { connect }                   from 'react-redux'
import { rpc }                       from 'lib/rpc_calls'
import { showSendTransactionToasts } from 'lib/helpers'
import { Button, Input }             from '@poplocker/react-ui'
import { CSSTransition }             from 'react-transition-group'

import './send.css'

class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = { amount: '', amountError: '', to: '', toError: '' }
  }

  send(to, amount) {
    this.props.dispatch(rpc.send(to, amount));
  }

  handleTo(e) {
    const to = e.target.value;
    this.setState({ to: to }, () => {
      if (!to || window.web3.utils.isAddress(to)) this.setState({ toError: '' });
      else this.setState({ toError: 'Invalid address' });
    })
  }

  handleAmount(e) {
    const amount = e.target.value;
    this.setState({ amount: amount }, () => {
      try {
        amount && window.web3.utils.toWei(amount);
        this.setState({ amountError: '' });
      } catch {
        this.setState({ amountError: 'Invalid amount' });
      }
    })
  }

  shouldBeEnabled() {
    return this.state.amount &&
           !this.state.amountError &&
           this.state.to &&
           !this.state.toError;
  }

  handleBack() {
    window.history.back();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.shouldBeEnabled) {
      this.send(this.state.to, this.state.amount);
      this.setState({ to: '', amount: '' });
      showSendTransactionToasts(window.web3.utils.toWei(this.state.amount), this.props.balance);
    }
  }

  render () {
    return (
      <CSSTransition timeout={500} classNames="showup" appear={true} in={true}>
        <form className="send-panel" onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <div className="send-title">Send ETH</div>
            <Input className="send-to"
                   autoComplete="off"
                   spellCheck="false"
                   name="to"
                   label="To"
                   onChange={this.handleTo.bind(this)}
                   value={this.state.to}
                   error={this.state.toError} />

            <Input className="send-amount"
                   autoComplete="off"
                   spellCheck="false"
                   name="amount"
                   label="Amount"
                   onChange={this.handleAmount.bind(this)}
                   value={this.state.amount}
                   error={this.state.amountError} />
          </div>
          <div className="back-send">
            <Button type="button" kind="light" icon="back" onClick={this.handleBack.bind(this)}>Back</Button>
            <Button icon="arrow-up" disabled={!this.shouldBeEnabled()}>Send</Button>
          </div>
        </form>
      </CSSTransition>
    )
  }
}

export default connect(({ balance }) => ({ balance }))(Send);
