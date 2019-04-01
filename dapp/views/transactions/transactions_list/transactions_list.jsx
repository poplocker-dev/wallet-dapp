import React                   from 'react'
import { connect }             from 'react-redux'
import Transaction             from './transaction'
import { Preloader, Bouncing } from '@poplocker/react-ui'
import { rpc }                 from 'lib/rpc_calls'

import './transactions_list.css'

class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listAddress: this.props.address }
  }

  componentDidMount() {
    this.props.dispatch(rpc.fetchTxHistory());
  }

  render() {
    return (
      <Preloader value={this.props.txHistory != null} loader={Bouncing}>
        {this.list()}
        <div className="fade-out"/>
      </Preloader>
    )
  }

  list() {
    if (this.props.pendingTxs.length || (this.props.txHistory && this.props.txHistory.length))  {
      return (
        <div className="transactions-list">
          {this.props.pendingTxs.map((tx, index) => (
            <Transaction tx={tx} address={this.state.listAddress} status="pending" key={index} />
          ))}
          {this.props.txHistory.map((tx, index) => (
            <Transaction tx={tx} address={this.state.listAddress} status="complete" key={index} />
          ))}
        </div>
      )
    } else {
      return (
        <div className="transactions-list">
          <div className="no-transaction">There are no transactions yet</div>
        </div>
      )
    }
  }
}

export default connect(({ address, txHistory, pendingTxs }) => ({ address, txHistory, pendingTxs }))(TransactionList);
