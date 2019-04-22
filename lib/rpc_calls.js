import {updateAddress,
        updateBalance,
        updateConnection,
        updateSmartLocker,
        updatePendingTxs,
        addPendingTx,
        updateTxHistory,
        updateTxListAddress} from 'lib/store/actions'

// TODO: rpc should not dispatch actions
// move that logic to components
// replicate what's done in extension
export const rpc = {
  getAddress () {
    return function (dispatch) {
      window.web3.eth.getAccounts().then(([a]) => {
        if (a) dispatch(updateAddress(a));
      });
    }
  },

  getBalance () {
    return function (dispatch) {
      window.web3.eth.getAccounts().then(([addr]) => {
        if (addr) {
          window.web3.eth
                .getBalance(addr)
                .then(balance => dispatch(updateBalance(balance)))
        }
        else dispatch(updateBalance(0));
      })
    }
  },

  getSmartLockerState () {
    return function (dispatch) {
      if (window.popLocker) {
        window.popLocker
              .getSmartLockerState()
              .then(r => dispatch(updateSmartLocker(r)));
      } else dispatch(updateSmartLocker({ status: 'invalid' }));
    }
  },

  setSmartLockerAddress (addr) {
    return function (dispatch) {
      dispatch(updatePendingTxs([]));
      dispatch(updateTxHistory(null));
      return window.popLocker.setSmartLockerAddress(addr);
    }
  },

  send (to, amount) {
    return function (dispatch, getState) {

      const { address, connection } = getState();
      if (connection) {
        const tx = {
          to,
          from: address,
          value: window.web3.utils.toHex(window.web3.utils.toWei(amount, 'ether')),
          timeStamp: Date.now()/1000|0,
          chainId: config.constants.CHAIN_ID
        }

        window.web3.eth.sendTransaction(tx)
          .on('transactionHash', (txHash) => {
            tx.hash = txHash;
            dispatch(addPendingTx(tx))
          })
      }
    }
  },

  isListening () {
    return function (dispatch) {
      window.web3.eth.net.isListening()
            .then(r => dispatch(updateConnection(r? 1 : 0)))
    }
  },

  fetchTxHistory() {
    return function (dispatch, getState) {

      const { address, locker, txHistory, pendingTxs } = getState();
      if (address && locker.status) {
        const isSmartLocker = locker.status == 'smart' || locker.status == 'pending';
        if (!txHistory) {
          dispatchUpdateTxHistory(dispatch, address, isSmartLocker, pendingTxs);
        } else {
          fetchEtherscanTxHistory(address, isSmartLocker, 1, 1)
            .then(([latestTx]) => {
              const latestTxHash = latestTx? latestTx.hash : null;
              const firstHistoryTxHash = txHistory[0]? txHistory[0].hash : null;
              if (latestTxHash != firstHistoryTxHash)
                dispatchUpdateTxHistory(dispatch, address, isSmartLocker, pendingTxs);
            })
          }
      }
    }
  }
}

function dispatchUpdateTxHistory(dispatch, address, isSmartLocker, pendingTxs) {
  fetchEtherscanTxHistory(address, isSmartLocker, 1, 1000)
    .then(txHistory => {
      dispatch(updateTxListAddress(address, isSmartLocker));
      dispatch(updateTxHistory(txHistory));
      dispatch(updatePendingTxs(resolvePendingTxs(txHistory, pendingTxs)));
    })
}

function fetchEtherscanTxHistory(address, isSmartLocker, page, offset) {
  const internal = isSmartLocker ? 'internal' : '';
  const url = `${config.constants.ETHERSCAN_URL}${internal}&address=${address}&page=${page}&offset=${offset}`;
  return fetch(url)
    .then(response => response.json())
    .then(response => response.result);
}

function resolvePendingTxs(txHistory, pendingTxs) {
  let resolvedPendingTxs = [];
  for (const pendingTxIndex in pendingTxs) {
    let found = false;
    for (const txHistoryIndex in txHistory) {
      if (txHistory[txHistoryIndex].hash == pendingTxs[pendingTxIndex].hash) {
        found = true;
        break;
      }
      if (5000 + txHistory[txHistoryIndex].timeStamp < pendingTxs[pendingTxIndex].timeStamp) break;
    }
    if (!found) resolvedPendingTxs = [...resolvedPendingTxs, pendingTxs[pendingTxIndex]];
  }
  return resolvedPendingTxs;
}
