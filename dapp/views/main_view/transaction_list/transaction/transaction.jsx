import React       from 'react'
import { connect } from 'react-redux'
import cl          from 'classnames'
import unit        from 'ethjs-unit'

import './transaction.css'

const  isSender = (tx, addr) => {
  return tx.from == addr;
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

const Transaction = ({ tx, address }) => (
  <div className="tx">
    <div className={cl(classes(tx, address))}/>
    <div className="tx-info">
      <div className="tx-info-top">
        <div className="tx-address">
          { peer(tx, address) }
        </div>
        <div className="tx-value">
          { unit.fromWei(tx.value, 'ether') } ETH
        </div>
      </div>
      <div className="tx-info-bottom">
        { tx.timestamp }
      </div>
    </div>
  </div>
);

export default connect(({ address }) => ({ address }))(Transaction);
