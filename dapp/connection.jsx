import React from 'react'
import { connect } from 'react-redux'
import { setupWeb3 } from 'lib/init'
import { connected } from 'lib/store/actions'

class Connection extends React.Component {
  constructor (props) {
    super(props);
  }
  
  componentDidMount () {
    window.web3 = setupWeb3();
    window.web3.eth.net.isListening().then(r => this.props.dispatch(connected(r)));
  }
  
  render () { return this.props.children }
}

export default connect()(Connection);
