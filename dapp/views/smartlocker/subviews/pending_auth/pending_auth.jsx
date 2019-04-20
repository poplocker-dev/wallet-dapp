import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import { rpc }                from 'lib/rpc_calls'
import Waiting                from '../waiting'

class PendingAuthSubview extends React.Component {
  render () {
    return (
      <Waiting message='Pending authorization from an already linked device'
               onCancel={this.handleCancel.bind(this)}/>
    );
  }

  handleCancel () {
    this.props.setLocker(null).then(this.props.updateLocker);
  }
}

const mapDispatch = dispatch => ({
  setLocker: bindActionCreators(rpc.setSmartLockerAddress, dispatch),
  updateLocker: bindActionCreators(rpc.getSmartLockerState, dispatch)
});

export default connect(null, mapDispatch)(PendingAuthSubview);
