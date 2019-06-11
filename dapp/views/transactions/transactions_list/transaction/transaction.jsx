import React                    from 'react'
import { fixedEth }             from 'lib/helpers'
import { copyToClipboard }      from 'lib/helpers'
import { Indicator, Preloader } from '@poplocker/react-ui'
import { toast }                from 'react-toastify'

import './transaction.css'

class Transaction extends React.Component {
  constructor (props) {
    super(props);
    this.state = { address: null };
  }

  componentDidMount() {
    this.resolveAddress();
  }

  componentDidUpdate() {
    this.resolveAddress();
  }

  async resolveAddress() {
    let address = this.peer(this.props.tx, this.props.referenceAddress);
    if (address && this.props.registrar) {
      address = await this.props.registrar.resolveName(address);
    }
    if (address != this.state.address) this.setState({ address });
  }

  render () {
    return (
      <div className="transaction" onClick={ this.handleCopy.bind(this) }>
        <Indicator direction={ this.getIndicator(this.props.tx, this.props.referenceAddress, this.props.status) }/>
        <div className="info">
          <div className="info-top">

            <div className={`address ${this.isLongAddress(this.state.address)? 'address-expand' : ''}`}>
              <Preloader value={this.state.address}>
                { this.state.address || "Contract Deployment" }
              </Preloader>
            </div>
            <div className={`value ${this.isLongAddress(this.state.address)? 'value-contract' : ''}`}>
              { this.props.tx.sendAll? 'All' : fixedEth(this.props.tx.value) } ETH
            </div>

          </div>
          <div className="info-bottom">

            <div className="timestamp">
              { this.time(this.props.tx.timeStamp) }
            </div>
            <div className={`status ${this.getStatus(this.props.tx, this.props.status)}`}>
              { this.getStatus(this.props.tx, this.props.status) }
            </div>

          </div>
        </div>
      </div>
    );
  }

  getIndicator (tx, addr, status) {
    return this.isError(tx) ? 'error' : this.isSelf(tx, status) ? 'self' : this.isSender(tx, addr) ? 'up' : 'down';
  }

  getStatus (tx, status) {
    return this.isError(tx) ? 'error' : this.isSelf(tx, status) ? 'self' : status;
  }

  isError (tx) {
    return tx.isError && tx.isError != 0;
  }

  isSender (tx, addr) {
    return tx.from.toLowerCase() == addr.toLowerCase();
  }

  isSelf (tx, status) {
    return tx.from.toLowerCase() == tx.to.toLowerCase() && status != 'pending';
  }

  isLongAddress (addr) {
    return addr && addr.length > 32;
  }

  peer (tx, addr) {
    return this.isSender(tx, addr) ? tx.to : tx.from;
  }

  time (utime) {
    const date = new Date(utime*1000).toLocaleDateString();
    const time = new Date(utime*1000).toLocaleTimeString();
    return date.split('/').join('-') + ' ' + time.toLowerCase();
  }

  handleCopy () {
    if (this.state.address) {
      copyToClipboard(this.state.address);
      toast.info('Address copied to clipboard');
    }
  }
}

export default Transaction;
