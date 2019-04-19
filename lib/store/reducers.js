import { combineReducers } from 'redux';

function address(state = null, action) {
  if (action.type == 'ETH_ADDRESS_UPDATE') return action.address;
  else return state;
}

function balance(state = null, action) {
  if (action.type == 'ETH_BALANCE_UPDATE') return action.balance;
  else return state;
}

function txHistory(state = null, action) {
  switch (action.type) {
    case 'ETH_TX_HISTORY_UPDATE':
      return [...action.transactions];
    default:
      return state;
  }
}

function pendingTxs(state = [], action) {
  switch (action.type) {
    case 'ETH_PENDING_TXS_UPDATE':
      return [...action.transactions];
    case 'ETH_PENDING_TX_ADD':
      return [action.transaction, ...state];
    default:
      return state;
  }
}

function connection(state = -1, action) {
  switch (action.type) {
    case 'ETH_CONNECTION_UPDATE':
      return action.status ? 1 : 0;
    default:
      return state;
  }
}

function locker(state = { status: null }, action) {
  if (action.type == 'SMARTLOCKER_UPDATE') {
    return action.state;
  }
  else
    return state;
}

const reducers = combineReducers({ connection, address, balance, txHistory, pendingTxs, locker });
export default reducers;
