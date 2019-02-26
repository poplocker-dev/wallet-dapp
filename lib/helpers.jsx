function fixedEth (wei) {
  const a = window.web3.utils.toBN(wei);
  const b = window.web3.utils.toBN(1e13, 10);
  
  return a.divRound(b).toNumber(10)/1e5;
}

export { fixedEth }
