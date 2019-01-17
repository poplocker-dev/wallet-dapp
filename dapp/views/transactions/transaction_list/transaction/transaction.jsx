import React         from 'react'
import { connect }   from 'react-redux'
import unit          from 'ethjs-unit'
import { Indicator } from '@poplocker/react-ui'

import './transaction.css'

const Transaction = ({ tx, address }) => (
  <div className="transaction">
    <Indicator direction={ isSender(tx, address) ? 'up' : 'down' }/>
    <div className="info">
      <div className="info-top">

        <div className="address">
          { peer(tx, address) }
        </div>
        <div className="value">
          { unit.fromWei(tx.value, 'ether') } ETH
        </div>

      </div>
      <div className="info-bottom">
        { time(tx.timeStamp) }
      </div>
    </div>
  </div>
);

const isSender = (tx, addr) => {
  return tx.from.toLowerCase() == addr.toLowerCase();
}

const peer = (tx, addr) => {
  if (isSender(tx, addr))
    return tx.to
  else
    return tx.from;
}

const time = (utime) => {
  const date = new Date(utime*1000).toLocaleDateString("en-GB");
  return date.split('/').join('-');
}

export default connect(({ address }) => ({ address }))(Transaction);
