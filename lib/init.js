import Web3                 from 'web3'
import { store }            from 'lib/store'
import { updateConnection } from 'lib/store/actions'

function setupWeb3 () {
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    return new Web3(window.web3.currentProvider);
  }
  else {
    return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
}

export function init (render) {
  if (!window.web3 || !window.web3.eth)
    window.web3 = setupWeb3();
  
  window.web3.eth.net.isListening()
        .then(r => store.dispatch(updateConnection(r)))
        .catch(console.error)
  render(store)
}
