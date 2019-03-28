import React                  from 'react'
import { bindActionCreators } from 'redux'
import { Button }             from '@poplocker/react-ui'
import { connect }            from 'react-redux'
import { rpc }                from 'lib/rpc_calls'

class PendingAuth extends React.Component {
  render () {
    return (
      <div className="subview pending-auth">
        Pending Authorization
          <Button tabIndex={-1}
                  type="button"
                  icon="close"
                  kind="reject"
                  onClick={this.handleCancel.bind(this)}>
            Cancel
          </Button>
      </div>
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

export default connect(({ locker }) => ({ locker }), mapDispatch)(PendingAuth);
