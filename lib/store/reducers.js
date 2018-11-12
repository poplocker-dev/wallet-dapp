import { combineReducers } from 'redux'

function connected (state = false, action) {
  switch (action.type) {
    case 'ETH_CONNECTED':
      return action.status;
    default:
      return state;
  }
}

const reducers = combineReducers({ connected });

export default reducers;
