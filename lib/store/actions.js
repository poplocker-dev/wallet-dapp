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

export function updateHistory (transactions) {
  return {
    type: 'ETH_HISTORY_UPDATE',
    transactions
  }
}

export function updateSmartLocker (state) {
  return {
    type: 'SMARTLOCKER_UPDATE',
    state
  }
}

export function downPage (page) {
  return {
    type: 'ETH_HISTORY_DOWN_PAGE',
    page
  }
}

export function upPage (page) {
  return {
    type: 'ETH_HISTORY_UP_PAGE',
    page
  }
}

export function sendTokens (address) {
  return {
    type: 'ETH_SEND_TOKENS',
    address
  }
}

