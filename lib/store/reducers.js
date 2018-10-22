import { combineReducers } from 'redux'

function address (state = null, action) {
  if (action.type == 'ETH_CONNECTED') {
    return action.address
  }
  else return state;
}

const reducers = combineReducers({ address });

export default reducers;
