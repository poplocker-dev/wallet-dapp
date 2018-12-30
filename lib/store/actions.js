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

export function updateHistory (address) {
  return {
    type: 'ETH_HISTORY_UPDATE',
    address
  }
}

export function sendTokens (address) {
  return {
    type: 'ETH_SEND_TOKENS',
    address
  }
}

export function transactionList (address) {
  return {
    type: 'ETH_TRANSACTION_LIST',
    address
  }
}
