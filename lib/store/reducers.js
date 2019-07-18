import { combineReducers } from 'redux';

function address(state = null, action) {
  if (action.type == 'ETH_ACCOUNTS_UPDATE' && action.accounts.length > 0)
    return action.accounts[0];
  else
    return state;
}

function accounts(state = null, action) {
  if (action.type == 'ETH_ACCOUNTS_UPDATE') return action.accounts;
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

const reducers = combineReducers({ connection, address, accounts, balance, txHistory, pendingTxs });
export default reducers;
