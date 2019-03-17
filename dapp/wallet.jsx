import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'
import { init }     from 'lib/init'

import View       from './view'
import Frame      from './frame'

import './wallet.css'

init((store) => {
  ReactDOM.render(
    <Provider store={store}>
        <Frame>
          <View/>
        </Frame>
    </Provider>,
    document.body.appendChild(document.createElement('div')));
});
