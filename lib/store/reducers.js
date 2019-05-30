import { combineReducers } from 'redux';

function address(state = null, action) {
  if (action.type == 'ETH_ADDRESS_UPDATE') return action.address;
  else return state;
}

function balance(state = null, action) {
  if (action.type == 'ETH_BALANCE_UPDATE') return action.balance;
  else return state;
}

function txHistory(state = { transactions: null }, action) {
  switch (action.type) {
    case 'ETH_TX_HISTORY_UPDATE':
      const transactions = action.transactions ? [...action.transactions] : null;
      return { transactions, referenceAddress: action.referenceAddress };
    default:
      return state;
  }
}

function pendingTxs(state = { transactions: [] }, action) {
  switch (action.type) {
    case 'ETH_PENDING_TXS_UPDATE':
      return { transactions: [...action.transactions], referenceAddress: action.referenceAddress };
    case 'ETH_PENDING_TX_ADD':
      const transactions = [action.transaction, ...state.transactions];
      return { transactions, referenceAddress: state.referenceAddress };
    default:
      return state;
  }
}

function authorizedKeys(state = [], action) {
  switch (action.type) {
    case 'ETH_AUTHORIZED_KEYS_UPDATE':
      return [...action.keys];
    default:
      return state;
  }
}

function pendingKeys(state = [], action) {
  switch (action.type) {
    case 'ETH_PENDING_KEYS_UPDATE':
      return [...action.keys];
    default:
      return state;
  }
}

function selectedKey(state = { authorized: null, pending: null }, action) {
  switch (action.type) {
    case 'SELECT_AUTHORIZED_KEY':
      return { authorized: action.address, pending: null };
    case 'SELECT_PENDING_KEY':
      return { authorized: null, pending: action.address };
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

const keys     = combineReducers({ authorizedKeys, pendingKeys, selectedKey });
const reducers = combineReducers({ connection, address, balance, txHistory, pendingTxs, keys, locker });
export default reducers;
