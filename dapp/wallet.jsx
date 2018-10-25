import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'lib/store'
import { setupWeb3 } from 'lib/init'

window.onload = () => {
  window.web3 = setupWeb3();
};

ReactDOM.render(
  <Provider store={store}>
    <h1>PopWallet Dapp</h1>
  </Provider>,
  document.body.appendChild(document.createElement('div')));
