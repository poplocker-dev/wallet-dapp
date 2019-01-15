import React           from 'react'
import TransactionList from './transaction_list'
import SendReceive     from './send_receive'

import './transactions.css'

const TxPanel = () => (
  <div className="tx-panel">
    <TransactionList/>
    <SendReceive/>
  </div>
);

export default TxPanel;
