import React                   from 'react'
import { connect }             from 'react-redux'
import { asyncFetchHistory }   from 'lib/store/actions'
import Transaction             from './transaction'
import { Preloader, Bouncing } from '@poplocker/react-ui'

import './transactions_list.css'

class TransactionList extends React.Component {
  componentDidMount() {
    this.props.dispatch(asyncFetchHistory(this.props.address));
  }
  
  list (txs) {
    return (
      <Preloader value={txs} loader={Bouncing}>
        {
          txs && txs.map((tx, index) => (
            <Transaction tx={ tx } key={ index }/>
          ))
        }
      </Preloader>
    )
  }

  render () {
    return (
      <div className="transactions-list">
        <div className="scrollable">
          { this.list(this.props.history) }
        </div>
      </div>
    )
  }
}

export default connect(({ address, history }) => ({ address, history }))(TransactionList);
