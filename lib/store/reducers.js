import { combineReducers } from 'redux'

function address (state = [], action) {
  if (action.type == 'ETH_ADDRESS_UPDATE')
    return action.address;
  else
    return state;
}

function balance (state = null, action) {
  if (action.type == 'ETH_BALANCE_UPDATE')
    return action.balance;
  else
    return state;
}

function history (state = [], action) {
  switch (action.type) {
    case 'ETH_HISTORY_UPDATE':
      return action.transactions;
    case 'ETH_HISTORY_PUSH':
      return [...state, action.transaction];
    default:
      return state;
  }
}

function connected (state = false, action) {
  switch (action.type) {
    case 'ETH_CONNECTION_UPDATE':
      return action.status;
    default:
      return state;
  }
}

const reducers = combineReducers({ connected, address, balance, history });

export default reducers;
