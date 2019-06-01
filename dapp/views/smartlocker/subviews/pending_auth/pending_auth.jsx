import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import { rpc }                from 'lib/rpc_calls'
import { addressToEmoji }     from 'lib/helpers'
import Waiting                from '../waiting'

class PendingAuthSubview extends React.Component {
  render () {
    return (
      <Waiting message='Pending authorization from an already linked device'
               emojis={addressToEmoji(this.props.deviceAddress)}
               onCancel={this.handleCancel.bind(this)}/>
    );
  }

  handleCancel () {
    this.props.setLocker(null).then(this.props.updateLocker);
  }
}

const mapState = ({ locker }) => ({
  deviceAddress: locker.deviceAddress
});

const mapDispatch = dispatch => ({
  setLocker: bindActionCreators(rpc.setSmartLockerAddress, dispatch),
  updateLocker: bindActionCreators(rpc.getSmartLockerState, dispatch)
});

export default connect(mapState, mapDispatch)(PendingAuthSubview);
