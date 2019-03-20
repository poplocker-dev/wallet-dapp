import React                   from 'react'
import { bindActionCreators }  from 'redux'
import { connect }             from 'react-redux'
import { LockerButton }        from '@poplocker/react-ui'
import { rpc }                 from 'lib/rpc_calls'

const { R } = window;

class Locker extends React.Component {
  componentDidMount () {
    this.props.updateLocker();
  }

  render () {
    return (
      <LockerButton locker={this.props.locker}
                    onClick={this.handleClick.bind(this)}/>
    )
  }

  handleClick () {
    R.go(R.to_path('smartlocker'));
  }
}

const mapStore = ({ locker }) => ({ locker });
const mapDispatch = dispatch => ({
  updateLocker: bindActionCreators(rpc.getSmartLockerState, dispatch)
});

export default connect(mapStore, mapDispatch)(Locker);
