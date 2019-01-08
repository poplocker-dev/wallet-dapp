import React   from 'react'
import { connect } from 'react-redux'
import TransactionList  from './transaction_list'
import ActionPanel from './action_panel'
import SendPanel from './send_panel'

import './main_view.css'

const display = (panel) => {
  if (panel == 'send') 
    return (<SendPanel/>);
  else
    return (<ActionPanel/>);
}

const MainView = ({ panel }) => (
  <div className="main-view">
    <TransactionList/>
    { display(panel) }
  </div>
);

const mapStore = ({ router }) => {
  return {
    panel: (router.location.pathname == '/send') ? 'send' : 'action'
  }
}

export default connect(mapStore)(MainView);
