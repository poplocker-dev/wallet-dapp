import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'
import { init }     from 'lib/init'
import Router       from './router'
import View         from './views/view'
import MainView     from './views/main_view'

import './wallet.css'

init(store => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <View>
          <MainView/>
        </View>
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div')));
});
