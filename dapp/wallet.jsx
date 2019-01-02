import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'
import { store }    from 'lib/store'
import Web3         from './web3'
import Views        from './views'
import MainView     from './views/main_view'

import './wallet.css'

ReactDOM.render(
  <Provider store={store}>
    <Web3>
      <Views>
        <MainView/>
      </Views>
    </Web3>
  </Provider>,
  document.body.appendChild(document.createElement('div')));
