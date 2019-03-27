import AwesomeDebouncePromise from 'awesome-debounce-promise';

export class RegistrarContract {
  constructor(config) {
    this.contract = new window.web3.eth.Contract(config.abi, config.address);

    this.getAddressDebounced = AwesomeDebouncePromise(
      this.getAddress.bind(this),
      500
    );
  }

  getAddress (name) {
    return this.contract.methods.getAddress(name).call().then(result => {
      if (parseInt(result, 16) == 0)
        return false;
      else
        return result;
    });
  }

  createSmartLocker (name) {
    return this.contract.methods.createSmartLocker(name).send().then(result => {
      if (parseInt(result, 16) == 0)
        return false;
      else
        return result;
    });
  }
}
