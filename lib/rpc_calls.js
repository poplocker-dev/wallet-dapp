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

  getSmartLockerState (dispatchIfError=true) {
    return function (dispatch) {
      if (window.popLocker) {
        window.popLocker
              .getSmartLockerState()
              .then((state) => {
                if (state.status != 'error' || dispatchIfError) dispatch(updateSmartLocker(state));
              });
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

      const { address, txHistory, pendingTxs } = getState();
      if (address) {
        if (!txHistory) {
          dispatchUpdateTxHistory(dispatch, address, pendingTxs);
        } else {
          fetchEtherscanTxHistory(address, 1, 1)
            .then(([latestTx]) => {
              const latestTxHash = latestTx? latestTx.hash : null;
              const firstHistoryTxHash = txHistory[0]? txHistory[0].hash : null;
              if (latestTxHash != firstHistoryTxHash)
                dispatchUpdateTxHistory(dispatch, address, pendingTxs);
            })
          }
      }
    }
  }
}

function dispatchUpdateTxHistory(dispatch, address, pendingTxs) {
  fetchEtherscanTxHistory(address, 1, 500)
    .then(txHistory => {
      dispatch(updateTxListAddress(address));
      dispatch(updateTxHistory(txHistory));
      dispatch(updatePendingTxs(resolvePendingTxs(txHistory, pendingTxs)));
    })
}

function fetchEtherscanTxHistory(address, page, offset) {
  const url = `${config.constants.ETHERSCAN_URL}&address=${address}&page=${page}&offset=${offset}`;
  const internalUrl = `${config.constants.ETHERSCAN_URL}internal&address=${address}&page=${page}&offset=${offset}`;
  return Promise.all([fetch(url), fetch(internalUrl)])
                .then(([response, internalResponse]) => Promise.all([response.json(), internalResponse.json()]))
                .then(([response, internalResponse]) => response.result.concat(internalResponse.result)
                .sort((a, b) => {return b.timeStamp - a.timeStamp}));
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
