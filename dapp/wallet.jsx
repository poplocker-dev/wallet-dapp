import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'
import { init }     from 'lib/init'

import Connection   from './connection'
import Frame        from './frame'

import Views        from 'views'

import './wallet.css'

init((store) => {
  ReactDOM.render(
    <Provider store={store}>
        <Frame>
          <Connection>
            <Views/>
          </Connection>
        </Frame>
    </Provider>,
    document.body.appendChild(document.createElement('div')));
});
