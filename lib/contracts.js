import AwesomeDebouncePromise from 'awesome-debounce-promise';

class Contract {
  constructor(config) {
    this.contract = new window.web3.eth.Contract(config.abi, config.address);
  }
}

export class RegistrarContract extends Contract {
  constructor(config) {
    super(config);

    this.getAddressDebounced = AwesomeDebouncePromise(
      this.getAddress.bind(this),
      300
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

  createSmartLocker (name, from) {
    return this.contract.methods
               .createSmartLocker(name)
               .send({ from, value: 0 })
               .then(this.hasAddress);
  }
}

export class SmartLockerContract extends Contract {
  addKey (key) {
    const from = this.contract.options.address;
    const to   = this.contract.options.address;

    return this.contract.methods
               .addKey(key)
               .send({ from, to });
  }
}
