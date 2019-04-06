import AwesomeDebouncePromise from 'awesome-debounce-promise';

export class RegistrarContract {
  constructor(config) {
    // TODO: address of the registrar
    // should be provided by the extension
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

  // sends fixed value for now...
  // TODO: make it send whole account balance
  // with enough eth left for tx fees
  createSmartLocker (name, from) {
    return this.contract.methods
               .createSmartLocker(name)
               .send({ from, value: 0 })
               .then(this.hasAddress);
  }
}
