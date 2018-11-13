import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'lib/store'

import Connection from './connection'
import StatusBar from './status_bar'
import Address from './address'

ReactDOM.render(
  <Provider store={store}>
    <Connection>
      <StatusBar/>
      <Address/>
    </Connection>
  </Provider>,
  document.body.appendChild(document.createElement('div')));
