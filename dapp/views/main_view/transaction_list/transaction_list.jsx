import React                 from 'react'
import { connect }           from 'react-redux'
import { asyncFetchHistory } from 'lib/store/actions'
import Transaction           from './transaction'

import './transaction_list.css'

class TransactionList extends React.Component {
  componentDidMount() {
    this.props.dispatch(asyncFetchHistory(this.props.address));
  }
  
  list (txs) {
    return txs.map((tx, index) => (
      <Transaction tx={ tx } key={ index }/>
    ));
  }

  render () {
    return (
      <div className="transaction-list">
        <div className="title">
          Transactions
        </div>
        <div className="scrollable">
          { this.list(this.props.history) }
        </div>
      </div>
    )
  }
}

export default connect(({ address, history }) => ({ address, history }))(TransactionList);
