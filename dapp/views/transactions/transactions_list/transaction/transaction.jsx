import React         from 'react'
import { connect }   from 'react-redux'
import { fixedEth }  from 'lib/helpers'
import { Indicator } from '@poplocker/react-ui'

import './transaction.css'

const Transaction = ({ tx, address, isSmartLocker, status }) => (
  <div className={`transaction ${isSelf(tx, isSmartLocker)? 'self' : ''}`}>
    <Indicator direction={ isSender(tx, address) ? 'up' : 'down' }/>
    <div className="info">
      <div className="info-top">

        <div className="address">
          { peer(tx, address) }
        </div>
        <div className="value">
          { tx.sendAll? 'All' : fixedEth(tx.value) } ETH
        </div>

      </div>
      <div className="info-bottom">

        <div className="timestamp">
          { time(tx.timeStamp) }
        </div>
        <div className={`status ${status}`}>
          {status}
        </div>

      </div>
    </div>
  </div>
);

const isSender = (tx, addr) => {
  return tx.from.toLowerCase() == addr.toLowerCase();
}

const isSelf = (tx, isSmartLocker) => {
  return (tx.from.toLowerCase() == tx.to.toLowerCase()) && !isSmartLocker;
}

const peer = (tx, addr) => {
  if (isSender(tx, addr))
    return tx.to
  else
    return tx.from;
}

const time = (utime) => {
  const date = new Date(utime*1000).toLocaleDateString();
  const time = new Date(utime*1000).toLocaleTimeString();
  return date.split('/').join('-') + ' ' + time.toLowerCase();
}

export default Transaction;
