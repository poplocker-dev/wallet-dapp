import BigNumber from 'bignumber.js'
import { toast } from 'react-toastify'

function fixedEth (wei) {
  return BigNumber(wei.toString(10)).dividedBy('1e13')
    .integerValue(BigNumber.ROUND_CEIL)
    .dividedBy('1e5').toFixed();
}

function copyToClipboard (text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");

  document.body.removeChild(textarea);
}

function showSendTransactionToasts(balance, amount="1") {
  toast.info('Now authorize the transaction in your browser');
  if (window.web3.utils.toBN(balance).lt(window.web3.utils.toBN(amount)))
    toast.warning('You need to add funds to your account', { delay: 1000 });
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

export { fixedEth, copyToClipboard, showSendTransactionToasts, flags }
