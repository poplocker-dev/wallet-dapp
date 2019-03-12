import React           from 'react'
import TransactionList from './transactions_list'
import SendReceive     from './send_receive'

import './transactions.css'

const Transactions = () => (
  <div className="transactions">
    <TransactionList/>
    <SendReceive/>
  </div>
);

export default Transactions;
