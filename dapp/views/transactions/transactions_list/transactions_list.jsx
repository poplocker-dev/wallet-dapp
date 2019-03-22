import React                   from 'react'
import { connect }             from 'react-redux'
import Transaction             from './transaction'
import { Preloader, Bouncing } from '@poplocker/react-ui'
import { rpc }                 from 'lib/rpc_calls'

import './transactions_list.css'

class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    this.listAddress = null;
  }

  componentWillMount() {
    this.listAddress = this.props.address;
  }

  componentDidMount() {
    this.props.dispatch(rpc.fetchTxHistory());
  }

  render() {
    return (
      <Preloader value={this.props.txHistory != null} loader={Bouncing}>
        {this.list()}
      </Preloader>
    )
  }

  list() {
    if (this.props.txHistory && this.props.txHistory.length)  {
      return (
        <div className="transactions-list">
          {this.props.txHistory.map((tx, index) => (
            <Transaction tx={tx} address={this.listAddress} key={index} />
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

export default connect(({ txHistory, address }) => ({ txHistory, address }))(TransactionList);
