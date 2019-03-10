import {updateAddress,
        updateBalance,
        updateConnection,
        updateHistory} from 'lib/store/actions'

import { fixedEth } from 'lib/helpers'

export const rpc = {
  getAddress () {
    return function (dispatch) {
      window.web3.eth.getAccounts()
            .then(a => dispatch(updateAddress(a[0] || [])));
    }
  },

  getBalance () {
    return function (dispatch) {
      window.web3.eth.getAccounts().then(a => {
        if (a[0]) {
          window.web3.eth.getBalance(a[0])
                .then(b => fixedEth(b))
                .then(b => dispatch(updateBalance(b)))
        }
        else dispatch(updateBalance(0));
      })
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
          chainId: process.env.CHAIN_ID
        }

        window.web3.eth.sendTransaction(tx)
              .then(dispatch(updateHistory(tx)));
      }
    }
  },

  isListening () {
    return function (dispatch) {
      window.web3.eth.net.isListening()
            .then(r => dispatch(updateConnection(r)))
    }
  }
}
