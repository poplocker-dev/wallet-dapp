import AwesomeDebouncePromise from 'awesome-debounce-promise';

class Contract {
  constructor(abi, address) {
    this.contract = new window.web3.eth.Contract(abi, address);
  }
}

export class RegistrarContract extends Contract {
  constructor(abi, address) {
    super(abi, address);

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

  createSmartLocker (name, device, from) {
    return this.contract.methods
               .createSmartLocker(name, device)
               .send({ from, value: 0 })
               .then(this.hasAddress);
  }
}


export class SmartLockerContract extends Contract {
  addKey (key, name) {
    const from = this.contract.options.address;
    const to   = this.contract.options.address;

    return this.contract.methods
               .addKey(key, name)
               .send({ from, to });
  }

  getKeyList () {
    return this.contract.methods
               .getKeyList()
               .call()
  }

  getKeyName (addr) {
    return this.contract.methods
               .getKey(addr)
               .call()
  }
}
