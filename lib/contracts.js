import AwesomeDebouncePromise from 'awesome-debounce-promise';

export class RegistrarContract {
  constructor(config) {
    this.contract = new window.web3.eth.Contract(config.abi, config.address);

    this.getAddressDebounced = AwesomeDebouncePromise(
      this.getAddress.bind(this),
      500
    );
  }

  hasAddress (addr) {
    if (parseInt(addr, 16) == 0)
      return false;
    else
      return addr;
  }

  getAddress (name) {
    return this.contract.methods
               .getAddress(name)
               .call()
               .then(this.hasAddress);
  }

  createSmartLocker (name, from, value) {
    return this.contract.methods
               .createSmartLocker(name)
               .send({ from, value })
               .then(this.hasAddress);
  }
}
