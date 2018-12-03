import Web3 from 'web3'

export function setupWeb3 () {
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    return new Web3(window.web3.currentProvider);
  }
  else {
    return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
}
