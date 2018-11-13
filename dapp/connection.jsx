import React from 'react'
import { connect } from 'react-redux'
import { setupWeb3 } from 'lib/init'
import { updateConnection } from 'lib/store/actions'

class Connection extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  
  //hate this...
  static getDerivedStateFromProps(props) {
    if (!window.web3.eth)
      window.web3 = setupWeb3();

    window.web3.eth.net.isListening().then(r => props.dispatch(updateConnection(r)));
    return null;
  }
  
  render () { return this.props.children }
}

export default connect()(Connection);
