import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'
import { init }     from 'lib/init'

import View       from './view'
import Frame      from './frame'
import Connection from './connection'

import './wallet.css'

init((store) => {
  ReactDOM.render(
    <Provider store={store}>
        <Frame>
          <Connection>
            <View/>
          </Connection>
        </Frame>
    </Provider>,
    document.body.appendChild(document.createElement('div')));
});
