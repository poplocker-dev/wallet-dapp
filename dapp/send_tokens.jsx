import React       from 'react'
import { connect } from 'react-redux'
import { rpc }     from 'lib/rpc_calls'

class SendTokens extends React.Component {
  constructor(props) {
    super(props);
    this.toRef = React.createRef();
    this.amountRef = React.createRef();
  }

  send(to, amount) {
    this.props.dispatch(rpc.sendTokens(to, amount));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.send(this.toRef.current.value, this.amountRef.current.value);
  }

  render () {
    return (
      <form className="send-tokens" onSubmit={this.handleSubmit.bind(this)}>
        <input name="to" type="text" ref={this.toRef} value={this.toRef.value}/>
        <input name="amount" type="text" ref={this.amountRef} value={this.amountRef.value}/>
        <button>Send Tokens</button>
      </form>
    )
  }
}

export default connect()(SendTokens);
