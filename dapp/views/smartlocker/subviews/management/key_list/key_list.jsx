import React        from 'react'

import './key_list.css'

class KeyList extends React.Component {
  constructor (props) {
    super(props);
    this.state = { keyNames: [] };
  }

  componentDidMount () {
    this.fetchKeyNames().then(keyNames => {
      this.setState({ keyNames: keyNames.filter(key => key.length > 0) });
    });
  }

  fetchKeys () {
    return this.props.contract.getKeyList()
  }

  fetchKeyNames () {
    return this.fetchKeys().then(keys => {
      return Promise.all(keys.map(item => this.props.contract.getKeyName(item)));
    });
  }

  list () {
    if (this.state.keyNames.length == 0)
      return (
       <div className="key-list-item key-list-item--loading">
         Loading devices...
       </div>
      )
    else {
      return this.state.keyNames.map(name => (
        <div key={name} className="key-list-item key-list-item">
          <div className="key-list-item-indicator--authorized">
          </div>
          <div className="key-list-item-name">
            { name }
          </div>
          <div className="key-list-item-badge--authorized">
            Authorized
          </div>
        </div>
      ))
    }
  }

  onlyKeyWarning () {
    return (
      <div className="only-key-warning">
        <p>
          You have no other devices connected to your Smart Locker.
        </p>
        <p>
          Link another device for backup and recovery purposes.
        </p>
      </div>
    )
  }

  render () {
    if (this.props.locker.onlyKey)
      {
        return this.onlyKeyWarning();
      }
    else {
      return (
        <div className="key-list">
          { this.list() }
        </div>
      )
    }
  }
}

export default KeyList;
