import React        from 'react'
import { connect }  from 'react-redux'
import { rpc }      from 'lib/rpc_calls'

class Address extends React.Component {
  constructor(props) {
    super(props);
  }

  dirtyCopy() {
    var textArea = document.createElement("textarea");
    textArea.value = this.props.address;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }

  componentDidUpdate() {
    if (this.props.connected)
      this.props.dispatch(rpc.getAddress());
  }
  render () {
    return (
      <div className="address">
        { this.props.address }
        <button onClick={this.dirtyCopy.bind(this)}>Copy To Clipboard</button>
      </div>
    )
  }
}

export default connect(({ address, connected }) => ({ address, connected }))(Address);
