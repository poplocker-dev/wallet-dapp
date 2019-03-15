import React                   from 'react'
import { bindActionCreators }  from 'redux'
import { connect }             from 'react-redux'
import { Button }              from '@poplocker/react-ui'
import { rpc }                 from 'lib/rpc_calls'

class Locker extends React.Component {
  componentDidMount () {
    this.props.updateLocker();
  }

  render () {
    return (
      <div className="locker-button">
        <Button>{ this.props.locker.status }</Button>
      </div>
    )
  }
}

const mapStore = ({ locker }) => ({ locker });
const mapDispatch = dispatch => ({
  updateLocker: bindActionCreators(rpc.getSmartLockerState, dispatch),
});

export default connect(mapStore, mapDispatch)(Locker);
