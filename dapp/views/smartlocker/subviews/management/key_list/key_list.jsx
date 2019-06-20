import React                  from 'react'
import { connect }            from 'react-redux'
import Key                    from './key'

import './key_list.css'

class KeyList extends React.Component {
  keys (keys, status) {
    return (
      <>
        {keys.map((key, index) => (
          <Key address={key.address}
               name={key.name}
               status={status == 'authorized' && key.address == this.props.locker.deviceAddress? 'device' : status}
               timeStamp={key.timeStamp}
               key={index} />
        ))}
      </>
    )
  }

  list () {
    return (
      <>
        {this.keys(this.props.locker.requests, "pending")}
        {this.keys(this.props.locker.keys, "authorized")}
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

export default connect(({ locker }) => ({ locker }))(KeyList);
