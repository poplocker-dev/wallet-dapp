import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'
import { init }     from 'lib/init'

import ViewManager  from './view_manager'
import Frame        from './frame'

import './wallet.css'

init((store) => {
  ReactDOM.render(
    <Provider store={store}>
        <Frame>
          <ViewManager/>
        </Frame>
    </Provider>,
    document.body.appendChild(document.createElement('div')));
});
