import React                    from 'react'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import Key                      from './key'
import { updateAuthorizedKeys,
         updatePendingKeys }    from 'lib/store/actions'

import './key_list.css'

class KeyList extends React.Component {
  componentDidMount () {
    this.startPolling();
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  startPolling() {
    this.pollForStatus();
    this.timer = setInterval(() => this.pollForStatus(), 4000);
  }

  pollForStatus() {
    this.processPendingKeys();
    this.fetchAuthorizedKeys()
        .then(this.props.updateAuthorizedKeys);
  }

  processPendingKeys () {
    const now = Date.now();
    const { pendingKeys } = this.props.keys;
    Promise.all(pendingKeys.map(key => this.props.smartLocker.isAuthorizedKey(key.address)))
           .then(authorized => pendingKeys.filter((key, index) => this.isValidPendingKey(key, authorized[index], now))
                                          .map(key => ({ ...key, validated: true })))
           .then(this.props.updatePendingKeys);
  }

  isValidPendingKey (key, authorized, now) {
    return key.smartLocker == this.props.locker.smartLockerAddress &&
           !authorized &&
           key.timeStamp - 60000 < now && now < key.timeStamp + 300000;
  }

  fetchAuthorizedKeys () {
    return this.fetchAuthorizedKeyList()
               .then(keyList => {
                 return Promise.all(keyList.map(address => this.props.smartLocker.getKey(address)))
                               .then(keys => keys.map((name, index) => ({ address: keyList[index], name })))
               });
  }

  fetchAuthorizedKeyList () {
    return this.props.smartLocker.getKeyList()
                                 .then(keyList => keyList.filter(address => address > 0));
  }

  keysEmpty () {
    return !this.props.keys.authorizedKeys.length;
  }

  keys (keys, status) {
    return (
      <>
        {keys.map((key, index) => (
          <Key address={key.address}
               name={key.name}
               status={status == 'authorized' && key.address == this.props.locker.deviceAddress? 'device' : status}
               key={index} />
        ))}
      </>
    )
  }

  list () {
    if (this.keysEmpty())
      return (
        <div className="key-loading">
          Loading devices...
        </div>
      )
    else
      return (
        <>
          {this.keys(this.props.keys.pendingKeys.filter(key => key.validated), "pending")}
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

const mapState = ({ locker, keys }) => ({ locker, keys });

const mapDispatch = dispatch => ({
  updateAuthorizedKeys : bindActionCreators(updateAuthorizedKeys, dispatch),
  updatePendingKeys : bindActionCreators(updatePendingKeys, dispatch)
});

export default connect(mapState, mapDispatch)(KeyList);
