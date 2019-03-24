export class RegistrarContract {
  constructor(config) {
    this.contract = new window.web3.eth.Contract(config.abi, config.address);
  }

  getAddress (name) {
    return this.contract.methods.getAddress(name).call().then(result => {
      if (parseInt(result, 10) == 0)
        return null;
      else
        return result;
    });
  }
}
