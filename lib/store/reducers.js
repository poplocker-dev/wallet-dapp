import { combineReducers } from 'redux'

function address (state = null, action) {
  if (action.type == 'ETH_ADDRESS_UPDATE')
    return action.address;
  else
    return state;
}

function connected (state = false, action) {
  switch (action.type) {
    case 'ETH_CONNECTION_UPDATE':
      return action.status;
    default:
      return state;
  }
}

const reducers = combineReducers({ connected, address });

export default reducers;
