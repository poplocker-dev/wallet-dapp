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

export function updateTxHistory (transactions) {
  return {
    type: 'ETH_TX_HISTORY_UPDATE',
    transactions
  }
}

export function prevPage (page) {
  return {
    type: 'ETH_TX_HISTORY_PREV_PAGE',
    page
  }
}

export function nextPage (page) {
  return {
    type: 'ETH_TX_HISTORY_NEXT_PAGE',
    page
  }
}

export function sendTokens (address) {
  return {
    type: 'ETH_SEND_TOKENS',
    address
  }
}
