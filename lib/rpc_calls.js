import { updateAddress, updateBalance } from 'lib/store/actions'

export const rpc = {
  get address () {
    return function (dispatch) {
      window.web3.eth.getAccounts().then(a => dispatch(updateAddress(a[0])));
    }
  },

  get balance () {
    return function (dispatch) {
      window.web3.eth.getAccounts()
            .then(a => window.web3.eth.getBalance(a[0]))
            .then(b => window.web3.utils.fromWei(b, "ether"))
            .then(b => dispatch(updateBalance(b)))
    }
  }
}
