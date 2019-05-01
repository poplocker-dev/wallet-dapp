import React                   from 'react'
import { bindActionCreators }  from 'redux'
import { connect }             from 'react-redux'
import { LockerButton }        from '@poplocker/react-ui'
import { rpc }                 from 'lib/rpc_calls'
import { flags }               from 'lib/helpers'
import { RegistrarContract }   from 'lib/contracts'

const { R } = window;

class Locker extends React.Component {
  componentDidMount () {
    this.startPolling();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startPolling() {
    this.pollForStatus();
    this.timer = setInterval(() => this.pollForStatus(), 2000);
  }

  pollForStatus() {
    this.props.updateLocker();

    const creating = flags.creatingLocker;
    if (creating) {

      if (!this.registrar) {
        const { abi } = config.contracts.registrar;
        const { address } = this.props.locker.registrar;
        this.registrar = new RegistrarContract(abi, address);
      }

      this.registrar.getAddress(creating).then(address => {
        if (address) {
          flags.creatingLocker = false;
          this.props.setLocker(address);
        }
      });

    }
  }

  render () {
    if (!this.props.locker.status == 'error')
      return this.lockerButton();
    else
      return null;
  }

  lockerButton () {
    return (
        <LockerButton locker={this.props.locker}
                      creating={flags.creatingLocker}
                      onClick={this.handleClick.bind(this)}/>
    )
  }

  handleClick () {
    R.go(R.to_path('smartlocker'));
  }
}

const mapStore = ({ locker }) => ({ locker });
const mapDispatch = dispatch => ({
  setLocker: bindActionCreators(rpc.setSmartLockerAddress, dispatch),
  updateLocker: bindActionCreators(rpc.getSmartLockerState, dispatch)
});

export default connect(mapStore, mapDispatch)(Locker);
