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

export function updateTxHistory (transactions, referenceAddress) {
  return {
    type: 'ETH_TX_HISTORY_UPDATE',
    transactions,
    referenceAddress
  }
}

export function updateSmartLocker (state) {
  return {
    type: 'SMARTLOCKER_UPDATE',
    state
  }
}

export function updatePendingTxs (transactions, referenceAddress) {
  return {
    type: 'ETH_PENDING_TXS_UPDATE',
    transactions,
    referenceAddress
  }
}

export function addPendingTx (transaction) {
  return {
    type: 'ETH_PENDING_TX_ADD',
    transaction
  }
}

export function updateAuthorizedKeys (keys) {
  return {
    type: 'ETH_AUTHORIZED_KEYS_UPDATE',
    keys
  }
}

export function updatePendingKeys (keys) {
  return {
    type: 'ETH_PENDING_KEYS_UPDATE',
    keys
  }
}

export function selectAuthorizedKey (address) {
  return {
    type: 'SELECT_AUTHORIZED_KEY',
    address
  }
}

export function selectPendingKey (address) {
  return {
    type: 'SELECT_PENDING_KEY',
    address
  }
}
