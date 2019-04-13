import React                  from 'react'
import { bindActionCreators } from 'redux'
import { connect }            from 'react-redux'
import { rpc }                from 'lib/rpc_calls'
import Waiting                from '../waiting'

class PendingAuthSubview extends React.Component {
  componentDidMount () {
    this.startPolling();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // TODO: create poller helper
  // with timer queue and stuff
  // so we don't need to manually
  // set and unset them
  startPolling() {
    this.pollForStatus();
    this.timer = setInterval(this.pollForStatus.bind(this), 5000);
  }

  pollForStatus () {
    this.props.updateLocker();
  }

  render () {
    return (
      <Waiting message='Pending Authorization'
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

export default connect(({ locker }) => ({ locker }), mapDispatch)(PendingAuthSubview);
