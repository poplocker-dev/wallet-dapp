import React                   from 'react'
import { bindActionCreators }  from 'redux'
import { connect }             from 'react-redux'
import Transaction             from './transaction'
import { Preloader, Bouncing } from '@poplocker/react-ui'

import { asyncFetchHistory }   from 'lib/store/actions'

import './transactions_list.css'

class TransactionList extends React.Component {
  componentDidMount() {
    this.props.loadHistory(this.props.address);
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
          { this.list(this.props.history.items) }
        </div>
        <button onClick={() => { this.props.next(this.props.address, this.props.history.page) }}>Next</button>
        <button onClick={() => { this.props.prev(this.props.address, this.props.history.page) }}>Prev</button>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  loadHistory: bindActionCreators(asyncFetchHistory, dispatch),
  next: function(addr, page) {
    this.loadHistory(addr, page + 1)
  },
  prev: function(addr, page) {
    this.loadHistory(addr, Math.max(0, page - 1))
  }
});

const mapStore = ({ address, history }) => ({
  address,
  history,
});


export default connect(mapStore, mapDispatch)(TransactionList);
