import BigNumber from 'bignumber.js'

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

export { fixedEth, flags }
