import React               from 'react'
import ReactDOM            from 'react-dom'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { Provider }        from 'react-redux'
import { init }            from 'lib/init'
import AddressGuard              from './router'
import Frame               from './views/frame'
import MainView            from './views/main_view'

import './wallet.css'

init((store, history) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>

        <Frame>
          <AddressGuard>
            <Switch>
              <Route path="/" component={MainView}/>
            </Switch>
          </AddressGuard>
        </Frame>

      </ConnectedRouter>
    </Provider>,
    document.body.appendChild(document.createElement('div')));
});
