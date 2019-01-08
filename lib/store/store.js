import { applyMiddleware, createStore }    from 'redux'
import { createBrowserHistory }            from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import thunk                               from 'redux-thunk'
import reducers                            from 'lib/store/reducers'

export const history = createBrowserHistory();
export const store = createStore(
  connectRouter(history)(reducers),
  applyMiddleware(routerMiddleware(history), thunk)
);
