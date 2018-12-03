import React       from 'react'
import { connect } from 'react-redux'
import { rpc }     from 'lib/rpc_calls'

class SendTokens extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  send() {
    this.props.dispatch(rpc.sendTokens(value));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.send(this.inputRef.current.value);
  }

  render () {
    return (
      <form className="send-tokens" onSubmit={this.handleSubmit.bind(this)}>
        <input name="send" type="text" ref={this.inputRef} value={this.inputRef.value}/>
        <button>Send Tokens</button>
      </form>
    )
  }
}

export default connect()(SendTokens);
