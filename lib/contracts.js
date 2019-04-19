import AwesomeDebouncePromise from 'awesome-debounce-promise';

class Contract {
  constructor(abi, address) {
    this.contract = new window.web3.eth.Contract(abi, address);
  }

  send(method, from, value) {
    return new Promise((resolve, reject) => {
      method.send({ from, value })
            .on('transactionHash', (txHash) => {
              const tx = {
                to: this.contract.options.address,
                from,
                value,
                timeStamp: Date.now()/1000|0,
                hash: txHash
              }
              resolve(tx)
            })
            .catch(reject)
    });
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

  createSmartLocker (name, from) {
    return super.send(
      this.contract.methods.createSmartLocker(name),
      from,
      0
    );
  }
}

export class SmartLockerContract extends Contract {
  addKey (key) {
    return super.send(
      this.contract.methods.addKey(key),
      this.contract.options.address,
      0
    );
  }
}
