import React       from 'react'
import { connect } from 'react-redux'
import cl          from 'classnames'
import unit        from 'ethjs-unit'

import './transaction.css'

const  isSender = (tx, addr) => {
  return tx.from.toLowerCase() == addr.toLowerCase();
}

const classes = (tx, addr) => ({
  'indicator': true,
  'indicator--out': isSender(tx, addr),
  'indicator--in': !isSender(tx, addr)
  
});

const  peer = (tx, addr) => {
  if (isSender(tx, addr))
    return tx.to
  else
    return tx.from;
}

// FIXME: dates are fubar
const time = (unix) => {
  const d = new Date(unix * 1000);
  return `${d.getDay()}-${d.getMonth()}-${d.getFullYear()}`
}

const Transaction = ({ tx, address }) => (
  <div className="transaction">
    <div className={cl(classes(tx, address))}/>
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

export default connect(({ address }) => ({ address }))(Transaction);
