import React           from 'react'
import { connect }     from 'react-redux'
import TransactionList from './transaction_list'
import ActionPanel     from './action_panel'
import SendPanel       from './send_panel'
import ReceivePanel    from './receive_panel'

import './main_view.css'

const display = (panel) => {
  switch (panel) {
      case '/send':
      return <SendPanel/>
      case '/receive':
      return <ReceivePanel/>
      default:
      return <ActionPanel/>
  }
}

const MainView = ({ panel }) => (
  <div className="main-view">
    <TransactionList/>
    { display(panel) }
  </div>
);

const mapStore = ({ router }) => ({
  panel: router.location.pathname
});

export default connect(mapStore)(MainView);
