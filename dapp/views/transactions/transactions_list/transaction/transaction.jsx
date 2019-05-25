import React         from 'react'
import { connect }   from 'react-redux'
import { fixedEth }  from 'lib/helpers'
import { Indicator } from '@poplocker/react-ui'

import './transaction.css'

const Transaction = ({ tx, address, status }) => (
  <div className="transaction">
    <Indicator direction={ getIndicator(tx, address, status) }/>
    <div className="info">
      <div className="info-top">

        <div className="address">
          { peer(tx, address) || "Contract Deployment" }
        </div>
        <div className="value">
          { fixedEth(tx.value) } ETH
        </div>

      </div>
      <div className="info-bottom">

        <div className="timestamp">
          { time(tx.timeStamp) }
        </div>
        <div className={`status ${getStatus(tx, status)}`}>
          { getStatus(tx, status) }
        </div>

      </div>
    </div>
  </div>
);

const getIndicator = (tx, addr, status) => {
  return isError(tx) ? 'error' : isSelf(tx, status) ? 'self' : isSender(tx, addr) ? 'up' : 'down';
}

const getStatus = (tx, status) => {
  return isError(tx) ? 'error' : isSelf(tx, status) ? 'self' : status;
}

const isError = (tx) => {
  return tx.isError && tx.isError != 0;
}

const isSender = (tx, addr) => {
  return tx.from.toLowerCase() == addr.toLowerCase();
}

const isSelf = (tx, status) => {
  return tx.from.toLowerCase() == tx.to.toLowerCase() && status != 'pending';
}

const peer = (tx, addr) => {
  return isSender(tx, addr) ? tx.to : tx.from;
}

const time = (utime) => {
  const date = new Date(utime*1000).toLocaleDateString();
  const time = new Date(utime*1000).toLocaleTimeString();
  return date.split('/').join('-') + ' ' + time.toLowerCase();
}

export default Transaction;
