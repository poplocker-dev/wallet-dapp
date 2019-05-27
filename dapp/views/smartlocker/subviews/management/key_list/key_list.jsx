import React from 'react'

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
    return this.props.smartLocker.getKeyList()
  }

  fetchKeyNames () {
    return this.fetchKeys().then(keys => {
      return Promise.all(keys.map(item => this.props.smartLocker.getKeyName(item)));
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

export default KeyList;
