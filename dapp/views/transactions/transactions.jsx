import React           from 'react'
import TransactionList from './transactions_list'
import SendReceive     from './send_receive'

const Transactions = () => (
  <div className="transactions-view">
    <TransactionList/>
    <SendReceive/>
  </div>
);

export default Transactions;
