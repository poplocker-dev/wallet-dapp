export function updateConnection (status) {
  return {
    type: 'ETH_CONNECTION_UPDATE',
    status
  }
}

export function updateAddress (address) {
  return {
    type: 'ETH_ADDRESS_UPDATE',
    address
  }
}

export function updateBalance (balance) {
  return {
    type: 'ETH_BALANCE_UPDATE',
    balance
  }
}

export function asyncFetchHistory (address, page=1) {
  return function (dispatch) {
    fetch(`${process.env.ETHERSCAN_URL}&address=${address}&page=${page}`)
      .then(response => response.json())
      .then(({ result }) => dispatch(updateHistory(result, page)))
  }
}

export function updateHistory (transactions, page) {
  return {
    type: 'ETH_HISTORY_UPDATE',
    transactions,
    page
  }
}

export function addToHistory (transaction) {
  return {
    type: 'ETH_HISTORY_UPDATE',
    transaction
  }
}

export function sendTokens (address) {
  return {
    type: 'ETH_SEND_TOKENS',
    address
  }
}

