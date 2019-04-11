import React                   from 'react'
import { bindActionCreators }  from 'redux'
import { connect }             from 'react-redux'
import { Button, Input }       from '@poplocker/react-ui'
import { SmartLockerContract } from 'lib/contracts'
import { rpc }                 from 'lib/rpc_calls'

class ManagementSubview extends React.Component {
  constructor (props) {
    super(props);

    const { abi } = config.contracts.smartLocker;
    const { address } = this.props;

    this.state = { key: '', error: '' };
    this.smartLocker = new SmartLockerContract({ abi, address });
  }

  render () {
    return (
      <div className="management-view">
        { this.onlyKeyWarning() }

        <form onSubmit={this.handleAuth.bind(this)}>
          <Input
            autoComplete="off"
            spellCheck="false"
            label="Device Address:"
            autoFocus={true}
            onChange={this.handleInput.bind(this)}
            error={this.state.error}
            value={this.state.key} />

          <Button tabIndex={-1}
                  type="button"
                  icon="tick"
                  disabled={!this.state.key}
                  onClick={this.handleAuth.bind(this)}>
            Authorize
          </Button>
        </form>

      </div>
    );
  }

  handleInput (e) {
    this.setState({ error: '' });
    this.setState({ key: e.target.value });
  }

  handleAuth () {
    this.smartLocker
        .addKey(this.state.key)
        .then(this.props.updateLocker)
        .catch(() => this.setState({ error: 'Invalid address' }));
  }

  onlyKeyWarning () {
    if (this.props.locker.onlyKey)
      return (
        <div className="only-key-warning">
          Warning, only key
        </div>
      )
    else
      return null;
  }
}

const mapDispatch = dispatch => ({
  updateLocker: bindActionCreators(rpc.getSmartLockerState, dispatch)
});

export default connect(({ locker, address }) => ({ locker, address }), mapDispatch)(ManagementSubview);
