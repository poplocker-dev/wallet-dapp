import React                 from 'react'
import { connect }           from 'react-redux'
import { asyncFetchHistory } from 'lib/store/actions'
import Transaction           from './transaction'
import { Bouncing }          from '@poplocker/react-ui'

import './transactions_list.css'

class TransactionList extends React.Component {
  componentDidMount() {
    this.props.dispatch(asyncFetchHistory(this.props.address));
  }
  
  list (txs) {
    return (
      <div className="transactions-list">
        <div className="scrollable">
          { 
            txs.map((tx, index) => (
              <Transaction tx={ tx } key={ index }/>
            ))
          }
        </div>
      </div>
    )
  }

  loader () {
    return (
      <Bouncing/>
    )
  }
  
  render () {
    if (this.props.history != null)
      return this.list(this.props.history);
    else
      return this.loader();
  }
}

export default connect(({ address, history }) => ({ address, history }))(TransactionList);
