import { updateAddress } from 'lib/store/actions'

export const rpc = {
  get address () {
    return function (dispatch) {
      window.web3.eth.getAccounts().then(a => { dispatch(updateAddress(a[0])) });
    }
  }
}
