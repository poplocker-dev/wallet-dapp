import React                         from 'react'
import { connect }                   from 'react-redux'
import { bindActionCreators }        from 'redux'
import KeyList                       from './key_list'
import { Button, Input }             from '@poplocker/react-ui'
import { SmartLockerContract }       from 'lib/contracts'
import { showSendTransactionToasts } from 'lib/helpers'
import { addPendingTx }              from 'lib/store/actions'

import './management.css'

class ManagementSubview extends React.Component {
  constructor (props) {
    super(props);

    const { abi } = config.contracts.smartLocker;
    const { address } = this.props;

    this.state = { key: '', error: '' };
    this.smartLocker = new SmartLockerContract(abi, address);
  }

  render () {
    return (
      <div className="subview management-subview">

        <KeyList contract={this.smartLocker}
                 locker={this.props.locker}/>

        <form onSubmit={this.handleAuth.bind(this)}>
          <Input
            autoComplete="off"
            spellCheck="false"
            label="Device Address:"
            autoFocus={true}
            onChange={this.handleKeyInput.bind(this)}
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

  handleKeyInput (e) {
    this.setState({ error: '' });
    this.setState({ key: e.target.value });
  }

  handleAuth (e) {
    e.preventDefault();
    this.smartLocker
        .addKey(this.state.key, `Device-${this.state.key.slice(0,4)}`)
        .then(this.props.addPendingTx)
        .catch(console.error);
    this.setState({ key: '', error: '' });
    showSendTransactionToasts(this.props.balance);
  }
}

const mapState = ({ locker, address, balance }) => ({
  locker,
  address,
  balance
});

const mapDispatch = dispatch => ({
  addPendingTx : bindActionCreators(addPendingTx, dispatch)
});

export default connect(mapState, mapDispatch)(ManagementSubview);
