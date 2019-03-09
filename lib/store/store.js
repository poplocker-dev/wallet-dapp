import { applyMiddleware, createStore }    from 'redux'
import { createBrowserHistory }            from 'history'
import thunk                               from 'redux-thunk'
import reducers                            from 'lib/store/reducers'

export const history = createBrowserHistory();
export const store = createStore(
  reducers,
  applyMiddleware(thunk)
);
