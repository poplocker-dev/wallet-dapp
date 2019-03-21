import { combineReducers } from 'redux';

function address(state = null, action) {
  if (action.type == 'ETH_ADDRESS_UPDATE') return action.address;
  else return state;
}

function balance(state = null, action) {
  if (action.type == 'ETH_BALANCE_UPDATE') return action.balance;
  else return state;
}

function txHistoryItems(state = null, action) {
  switch (action.type) {
    case 'ETH_TX_HISTORY_UPDATE':
      return [...action.transactions];
    default:
      return state;
  }
}

function txHistoryPage(state = 1, action) {
  switch (action.type) {
    case 'ETH_TX_HISTORY_NEXT_PAGE':
      return state + 1;
    case 'ETH_TX_HISTORY_PREV_PAGE':
      return Math.max(1, state - 1);
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

const txHistory = combineReducers({
  items: txHistoryItems,
  page: txHistoryPage,
  pageSize: () => 5
});
const reducers = combineReducers({ connection, address, balance, txHistory });
export default reducers;
