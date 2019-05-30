import React                    from 'react'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import Key                      from './key'
import { updateAuthorizedKeys } from 'lib/store/actions'

import './key_list.css'

class KeyList extends React.Component {
  componentDidMount () {
    this.startPolling();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startPolling() {
    this.pollForStatus();
    this.timer = setInterval(() => this.pollForStatus(), 4000);
  }

  pollForStatus() {
    this.fetchKeys()
        .then(this.props.updateAuthorizedKeys);
  }

  fetchKeyList () {
    return this.props.smartLocker.getKeyList()
                                 .then(keyList => keyList.filter(item => item > 0));
  }

  fetchKeys () {
    return this.fetchKeyList()
               .then(keyList => {
                 return Promise.all(keyList.map(item => this.props.smartLocker.getKey(item)))
                               .then(keys => keys.map((item, index) => ({ address: keyList[index], name: item })))
               });
  }

  keysEmpty () {
    return !(this.props.keys.authorizedKeys.length + this.props.keys.pendingKeys.length);
  }

  keys (keys, status) {
    return (
      <>
        {keys.map((key, index) => (
          <Key address={key.address}
               name={key.name}
               status={status == 'authorized' && key.address == this.props.deviceAddress? 'device' : status}
               key={index} />
        ))}
      </>
    )
  }

  list () {
    // TODO: use authorized keys as pending for testing for now
    // should be -> {this.keys(this.props.keys.pendingKeys, "pending")}
    if (this.keysEmpty())
      return (
        <div className="key-loading">
          Loading devices...
        </div>
      )
    else
      return (
        <>
          {this.keys(this.props.keys.authorizedKeys, "pending")}
          {this.keys(this.props.keys.authorizedKeys, "authorized")}
        </>
      )
  }

  render () {
    return (
      <div>
        <div className="key-list">
          { this.list() }
        </div>
        <div className="fade-out"/>
      </div>
    )
  }
}

const mapState = ({ locker, keys }) => ({
  deviceAddress: locker.deviceAddress,
  keys
});

const mapDispatch = dispatch => ({
  updateAuthorizedKeys : bindActionCreators(updateAuthorizedKeys, dispatch)
});

export default connect(mapState, mapDispatch)(KeyList);
