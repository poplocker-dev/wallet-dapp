import AwesomeDebouncePromise from 'awesome-debounce-promise';

class Contract {
  constructor(abi, address) {
    this.contract = new window.web3.eth.Contract(abi, address);
  }

  send(method, from, value, sendAll=false) {
    return new Promise((resolve, reject) => {
      method.send({ from, value, sendAll })
            .on('transactionHash', (txHash) => {
              const tx = {
                to: this.contract.options.address,
                from,
                value,
                sendAll,
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

  hasName (name) {
    if (name.length == 0)
      return false;
    else
      return name;
  }

  getName (addr) {
    return this.contract.methods
               .getName(addr)
               .call()
               .then(this.hasName);
  }

  resolveName (addr) {
    return new Promise(resolve => {
      if (RegistrarContract.resolvedNames.has(addr)) {
        resolve(RegistrarContract.resolvedNames.get(addr));
      } else {
        this.getName(addr)
            .then(name => {
              name = name || addr;
              RegistrarContract.resolvedNames.set(addr, name);
              resolve(name)
            })
      }
    })
  }

  createSmartLocker (name, device, from) {
    return super.send(
      this.contract.methods.createSmartLocker(name, device),
      from,
      0,
      true
    );
  }
}

RegistrarContract.resolvedNames = new Map();

export class SmartLockerContract extends Contract {
  addKey (addr, name) {
    return super.send(
      this.contract.methods.addKey(addr, name),
      this.contract.options.address,
      0
    );
  }

  removeKey (addr) {
    return super.send(
      this.contract.methods.removeKey(addr),
      this.contract.options.address,
      0
    );
  }

  getKeyList () {
    return this.contract.methods
               .getKeyList()
               .call()
  }

  getKey (addr) {
    return this.contract.methods
               .getKey(addr)
               .call()
  }
}
