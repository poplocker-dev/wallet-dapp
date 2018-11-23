import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'lib/store'

import Connection from './connection'
import StatusBar from './status_bar'
import Address from './address'
import Balance from './balance'
import SendTokens from './send_tokens'
import History from './history'

ReactDOM.render(
  <Provider store={store}>
    <Connection>
      <StatusBar/>
      <Address/>
      <Balance/>
      <SendTokens/>
      <History/>
    </Connection>
  </Provider>,
  document.body.appendChild(document.createElement('div')));
