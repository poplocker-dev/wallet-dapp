import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import { rpc }                from 'lib/rpc_calls'
import { flags }              from 'lib/helpers'
import Waiting                from '../waiting'

class DeployingSubview extends React.Component {
  render () {
    return (
      <Waiting message={this.message()}
               onCancel={this.handleCancel.bind(this)}/>
    );
  }

  message () {
    return 'Authorize the transaction and then wait for your Smart Locker to be created';
  }

  handleCancel () {
    flags.creatingLocker = false;
    this.props.setLocker(null).then(this.props.updateLocker);
  }
}

const mapDispatch = dispatch => ({
  setLocker: bindActionCreators(rpc.setSmartLockerAddress, dispatch),
  updateLocker: bindActionCreators(rpc.getSmartLockerState, dispatch)
});

export default connect(({ locker }) => ({ locker }), mapDispatch)(DeployingSubview);
