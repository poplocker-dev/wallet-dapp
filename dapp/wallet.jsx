import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'
import { store }    from 'lib/store'
import MainView     from './views/main_view'

import './wallet.css'

ReactDOM.render(
  <Provider store={store}>
    <>
      <MainView/>
    </>
  </Provider>,
  document.body.appendChild(document.createElement('div')));
