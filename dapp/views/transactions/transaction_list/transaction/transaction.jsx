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

const time = (utime) => {
  const date = new Date(utime*1000).toLocaleDateString("en-GB");
  return date.split('/').join('-');
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
