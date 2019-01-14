import React               from 'react'
import ReactDOM            from 'react-dom'
import { Route, Switch }   from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { Provider }        from 'react-redux'
import { init }            from 'lib/init'
import Connection          from './connection'
import Frame               from './frame'
import TxsPanel            from './panels/transactions'
import SendPanel           from './panels/send'

import './wallet.css'

init((store, history) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>

        <Frame>
          <Connection>
            <Switch>
              <Route exact path="/" component={TxsPanel}/>
              <Route path="/send" component={SendPanel}/>
              {/* <Route path="/receive" component={ReceivePanel}/> */}
            </Switch>
          </Connection>
        </Frame>

      </ConnectedRouter>
    </Provider>,
    document.body.appendChild(document.createElement('div')));
});
