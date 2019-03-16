import { combineReducers } from 'redux';

function address(state = null, action) {
  if (action.type == 'ETH_ADDRESS_UPDATE') return action.address;
  else return state;
}

function balance(state = null, action) {
  if (action.type == 'ETH_BALANCE_UPDATE') return action.balance;
  else return state;
}

function historyItems(state = null, action) {
  switch (action.type) {
    case 'ETH_HISTORY_UPDATE':
      return [...(state || []), ...action.transactions];
    default:
      return state;
  }
}

function historyPage(state = 1, action) {
  switch (action.type) {
    case 'ETH_HISTORY_UP_PAGE':
      return state + 1;
    case 'ETH_HISTORY_DOWN_PAGE':
      return Math.max(1, state - 1);
    default:
      return state;
  }
}

function historyLastPage(state = 1, action) {
  if (action.type == 'ETH_HISTORY_UP_PAGE') return state + 1;
  else return state;
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
  if (action.type == 'SMARTLOCKER_UPDATE')
    return action.state;
  else
    return state;
}

const history = combineReducers({
  items: historyItems,
  page: historyPage,
  lastPage: historyLastPage
});
const reducers = combineReducers({ connection, address, balance, history, locker });
export default reducers;
