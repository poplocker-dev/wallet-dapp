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

export function updateSmartLocker (state) {
  return {
    type: 'SMARTLOCKER_UPDATE',
    state
  }
}

export function updatePendingTxs (transactions) {
  return {
    type: 'ETH_PENDING_TXS_UPDATE',
    transactions
  }
}

export function addPendingTx (transaction) {
  return {
    type: 'ETH_PENDING_TX_ADD',
    transaction
  }
}

export function updateTxListAddress (address) {
  return {
    type: 'ETH_TX_LIST_ADDRESS_UPDATE',
    address
  }
}
