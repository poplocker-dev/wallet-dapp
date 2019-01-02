import React   from 'react'
import Balance from 'ui/balance'
import TransactionList from './transaction_list'

import './main_view.css'

const MainView = () => (
  <div className="main-view">
    <div className="title">
      Your total balance
    </div>
    <Balance/>
    <TransactionList/>
  </div>
);

export default MainView;
