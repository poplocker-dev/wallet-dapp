import React                 from 'react'
import { connect }           from 'react-redux'
import { asyncFetchHistory } from 'lib/store/actions'
import unit                  from 'ethjs-unit'

import './transaction_list.css'

class TransactionList extends React.Component {
  componentDidMount() {
    this.props.dispatch(asyncFetchHistory(this.props.address));
  }

  isSender (tx) {
    return tx.from == this.props.address;
  }
  
  peer (tx) {
    if (this.isSender(tx))
      return tx.to
    else
      return tx.from;
  }
  
  list (txs) {
    return txs.map((tx, index) => (
      <div className="tx" key={index}>
        <div className="indicator"/>
        <div className="tx-info">
          <div className="tx-info-top">
            <div className="tx-address">
              { this.props.address }
            </div>
            <div className="tx-value">
              { unit.fromWei(tx.value, 'ether') } ETH
            </div>
          </div>
          <div className="tx-info-bottom">
          </div>
        </div>
      </div>
    ));
  }

  render () {
    return (
      <div className="transaction-list">
        { this.list(this.props.history) }
      </div>
    )
  }
}

export default connect(({ address, history }) => ({ address, history }))(TransactionList);
