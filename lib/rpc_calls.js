import {updateAddress, updateBalance, updateHistory} from 'lib/store/actions'

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
            .then(b => window.web3.utils.fromWei(b, "ether"))
            .then(b => dispatch(updateBalance(b)))
        }
        else dispatch(updateBalance(0));
      })
    }
  },

  sendTokens (to) {
    return function (dispatch, getState) {
      const { address, connected } = getState();

      if (connected) {
        const tx = {
          to,
          from: address,
          value: window.web3.utils.toHex(window.web3.utils.toWei('0.2', 'ether')),
          chainId: '3'
        }

        window.web3.eth.sendTransaction(tx)
              .then(dispatch(updateHistory(tx.to)));
      }

    }
  }
}
