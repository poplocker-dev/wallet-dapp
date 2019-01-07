import React   from 'react'
import TransactionList from './transaction_list'
import SendTokens from './send_tokens'

import './main_view.css'

const MainView = () => (
  <div className="main-view">
    <TransactionList/>
    <SendTokens/>
  </div>
);

export default MainView;
