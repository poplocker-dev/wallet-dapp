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

function history (state = null, action) {
  switch (action.type) {
    case 'ETH_HISTORY_UPDATE':
      return action.transactions;
    case 'ETH_HISTORY_PUSH':
      return [...(state || []), action.transaction];
    default:
      return state;
  }
}

function connection (state = -1, action) {
  switch (action.type) {
    case 'ETH_CONNECTION_UPDATE':
      return action.status ? 1 : 0;
    default:
      return state;
  }
}

const reducers = combineReducers({ connection, address, balance, history });
export default reducers;
