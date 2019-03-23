import {updateAddress,
        updateBalance,
        updateConnection,
        updateTxHistory,
        updatePendingTxs} from 'lib/store/actions'

import { fixedEth } from 'lib/helpers'

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
                .then(balance => dispatch(updateBalance(fixedEth(balance))))
        }
        else dispatch(updateBalance(0));
      })
    }
  },

  send (to, amount) {
    return function (dispatch, getState) {

      const { address, connection, pendingTxs } = getState();
      if (connection) {
        const tx = {
          to,
          from: address,
          value: window.web3.utils.toHex(window.web3.utils.toWei(amount, 'ether')),
          timeStamp: Date.now()/1000|0,
          chainId: process.env.CHAIN_ID
        }

        window.web3.eth.sendTransaction(tx)
              .then(dispatch(updatePendingTxs([tx, ...pendingTxs])));
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

      const { address, txHistory } = getState();
      if (address) {
        if (!txHistory) {
          fetchEtherscanTxHistory(address)
            .then(result => dispatch(updateTxHistory(result)));
        } else {
          fetchEtherscanTxHistory(address, 1, 1)
            .then(([latestTx]) => {
              const latestTxHash = latestTx? latestTx.hash : null;
              const firstHistoryTxHash = txHistory[0]? txHistory[0].hash : null;
              if (latestTxHash != firstHistoryTxHash)
              {
                fetchEtherscanTxHistory(address)
                  .then(result => dispatch(updateTxHistory(result)));
              }
            })
          }
      }
    }
  }
}

function fetchEtherscanTxHistory(address, page, offset) {
  const url = `${process.env.ETHERSCAN_URL}&address=${address}`+(page? `&page=${page}` : ``)+(offset? `&offset=${offset}` : ``);
  return fetch(url)
    .then(response => response.json())
    .then(response => response.result);
}
