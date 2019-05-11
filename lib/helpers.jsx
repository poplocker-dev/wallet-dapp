import BigNumber from 'bignumber.js'
import { toast } from 'react-toastify'

function fixedEth (wei) {
  return BigNumber(wei.toString(10)).dividedBy('1e13')
    .integerValue(BigNumber.ROUND_CEIL)
    .dividedBy('1e5').toFixed();
}

const flags = {
  set creatingLocker (val) {
    if (val)
      window.localStorage.setItem('creating_locker_contract', val);
    else
      window.localStorage.removeItem('creating_locker_contract');
    return val;
  },

  get creatingLocker () {
    return window.localStorage.getItem('creating_locker_contract');
  }
}

function showSendTransactionToasts(amount, balance) {
  toast.info('Now authorize the transaction in your browser');
  if (new window.web3.utils.BN(balance).lt(new window.web3.utils.BN(amount)))
    toast.warning('You need to add funds to your account', { delay: 1000 });
}

export { fixedEth, flags, showSendTransactionToasts }
