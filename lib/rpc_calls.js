import { updateAccounts,
         updateBalance,
         updateConnection,
         updateSmartLocker,
         updatePendingTxs,
         addPendingTx,
         updateTxHistory,
         selectAuthorizedKey,
         selectPendingKey } from 'lib/store/actions'

export const rpc = {
  getAddress () {
    return function (dispatch) {
      window.web3.eth.getAccounts().then(a => {
        dispatch(updateAccounts(a));
      });
    }
  },

  unlockAccount () {
    return function (dispatch) {
      window.ethereum.send('eth_requestAccounts').then(a => {
        dispatch(updateAccounts(a));
      });
    }
  },

  getBalance (address) {
    return function (dispatch) {
      if (address) {
        window.web3.eth
              .getBalance(address)
              .then(balance => dispatch(updateBalance(balance)))
              .catch(() => dispatch(updateBalance(0)))
      }
      else dispatch(updateBalance(0));
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
      dispatch(updatePendingTxs([], addr));
      dispatch(updateTxHistory(null, addr));
      dispatch(selectAuthorizedKey(null, addr));
      dispatch(selectPendingKey(null, addr));
      return window.popLocker.setSmartLockerAddress(addr);
    }
  },

  removeKeyRequest (addr) {
    return function (dispatch) {
      return window.popLocker.removeKeyRequest(addr);
    }
  },

  send (to, amount, sendAll=false) {
    return function (dispatch, getState) {

      const { address, connection, locker } = getState();
      if (connection) {
        const tx = {
          to,
          from: address,
          value: window.web3.utils.toHex(window.web3.utils.toWei(amount || '0', 'ether')),
          sendAll,
          timeStamp: Date.now()/1000|0,
          chainId: config.constants.CHAIN_ID
        }

        window.web3.eth.sendTransaction(tx)
              .on('transactionHash', (txHash) => {
                tx.hash = txHash;
                if (locker.status != 'smart' && locker.status != 'pending')
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
        if (!txHistory.transactions) {
          dispatchUpdateTxHistory(dispatch, address, pendingTxs.transactions);
        } else {
          fetchEtherscanTxHistory(address, 1, 1)
            .then(([latestTx]) => {
              const latestTxHash = latestTx? latestTx.hash : null;
              const firstHistoryTxHash = txHistory.transactions[0]? txHistory.transactions[0].hash : null;
              if (latestTxHash != firstHistoryTxHash)
                dispatchUpdateTxHistory(dispatch, address, pendingTxs.transactions);
            })
        }
      }
    }
  }
}

function dispatchUpdateTxHistory(dispatch, address, pendingTxs) {
  fetchEtherscanTxHistory(address, 1, 500)
    .then(txHistory => {
      dispatch(updateTxHistory(txHistory, address));
      dispatch(updatePendingTxs(resolvePendingTxs(txHistory, pendingTxs), address));
    })
}

function fetchEtherscanTxHistory(address, page, offset) {
  const url = `${config.constants.ETHERSCAN_URL}&address=${address}&page=${page}&offset=${offset}`;
  const internalUrl = `${config.constants.ETHERSCAN_URL}internal&address=${address}&page=${page}&offset=${offset}`;
  return Promise.all([fetch(url), fetch(internalUrl)])
                .then(([response, internalResponse]) => Promise.all([response.json(), internalResponse.json()]))
                .then(([response, internalResponse]) => [response.result.filter(a => {return a.isError == '0' || a.to != address.toLowerCase() || a.value != '0'}),
                                                         internalResponse.result])
                .then(([response, internalResponse]) => internalResponse.concat(response)
                                                                        .sort((a, b) => {return b.timeStamp - a.timeStamp})
                                                                        .filter((a, b, c) => {return !b || a.hash != c[b-1].hash}));
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
