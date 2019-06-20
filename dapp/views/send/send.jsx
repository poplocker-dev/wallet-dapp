import React                         from 'react'
import Checkbox                      from 'ui/checkbox'
import { connect }                   from 'react-redux'
import { RegistrarContract }         from 'lib/contracts'
import { rpc }                       from 'lib/rpc_calls'
import { showSendTransactionToasts } from 'lib/helpers'
import { Button, Input }             from '@poplocker/react-ui'

import './send.css'

class Send extends React.Component {
  constructor(props) {
    super(props);
    this.createRegistrar();
    this.state = { amount: '', amountError: '', to: '', toError: '', lockerAddress: false, sendAll: false }
  }

  componentDidUpdate() {
    this.createRegistrar();
  }

  createRegistrar() {
    if (!this.registrar && this.props.locker.registrar) {
      const { abi } = config.contracts.registrar;
      const { address } = this.props.locker.registrar;
      this.registrar = new RegistrarContract(abi, address);
    }
  }

  send(to, amount, sendAll) {
    this.props.dispatch(rpc.send(to, amount, sendAll));
  }

  handleTo(e) {
    const to = e.target.value;
    this.setState({ to }, () => {

      if (!to || window.web3.utils.isAddress(to)) this.setState({ toError: '' });
      else this.setState({ toError: 'Invalid address or Smart Locker name' });

      if (to && window.web3.utils.utf8ToHex(to).length <= 66 && this.registrar) {
        this.registrar.getAddressDebounced(to).then(lockerAddress => {
          if (lockerAddress) this.setState({ toError: '' });
          this.setState({ lockerAddress });
        });
      }

    })
  }

  handleAmount(e) {
    const amount = e.target.value;
    this.setState({ amount }, () => {
      try {
        if (!amount || window.web3.utils.toWei(amount) >= 0)
          this.setState({ amountError: '' });
        else throw -1;
      } catch {
        this.setState({ amountError: 'Invalid amount' });
      }
    })
  }

  handleSendAll(e) {
    const sendAll = e.target.checked;
    this.setState({ sendAll, amount: '', amountError: '' });
  }

  shouldBeEnabled() {
    return (this.state.amount || this.state.sendAll) &&
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
      this.send(this.state.lockerAddress || this.state.to, this.state.amount, this.state.sendAll);
      showSendTransactionToasts(
        this.props.balance, 
        this.state.sendAll ? undefined : window.web3.utils.toWei(this.state.amount)
      );
      this.setState({ to: '', amount: '', lockerAddress: false, sendAll: false });
    }
  }

  render () {
    return (
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
                 disabled={this.state.sendAll}
                 onChange={this.handleAmount.bind(this)}
                 value={this.state.amount}
                 error={this.state.amountError} />

          <Checkbox className="send-all"
                    label="Send All"
                    onChange={this.handleSendAll.bind(this)}
                    checked={this.state.sendAll} />
        </div>
        <div className="back-send">
          <Button type="button" kind="light" icon="back" onClick={this.handleBack.bind(this)}>Back</Button>
          <Button icon="arrow-up" disabled={!this.shouldBeEnabled()}>Send</Button>
        </div>
      </form>
    )
  }
}

export default connect(({ locker, balance }) => ({ locker, balance }))(Send);
