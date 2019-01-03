import React                 from 'react'
import { connect }           from 'react-redux'
import { asyncFetchHistory } from 'lib/store/actions'

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
        <div className="address">
          { this.peer(tx) }
        </div>
        <div className="tx-value">
          { tx.value }
        </div>
        <div className="timestamp">
          { tx.timeStamp }
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
