import React           from 'react'
import TransactionList from './transaction_list'
import SendReceive     from './send_receive'

import './transactions.css'

const Transactions = () => (
  <div className="tx-panel">
    <TransactionList/>
    <SendReceive/>
  </div>
);

export default Transactions;
