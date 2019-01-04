import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'
import { init }     from 'lib/init'
import Router       from './router'
import Frame        from './views/frame'
import MainView     from './views/main_view'

import './wallet.css'

init(store => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Frame>
          <MainView/>
        </Frame>
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div')));
});
