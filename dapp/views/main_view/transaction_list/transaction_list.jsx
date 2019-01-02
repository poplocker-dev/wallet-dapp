import React        from 'react'
import { connect }  from 'react-redux'
import { updateHistory } from 'lib/store/actions'

class TransactionList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.fetchTransactions();
  }

  //TODO: fix address being always null.
  // it needs to be fetch on connection or in rpc call action (fetchHistory)
  // better: initialize wallet with calls to netListening, getAccountAddress and getBalance
  fetchTransactions() {
    if (this.props.connected && this.props.address) {
      fetch('https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=' + this.props.address +'&page=1&offset=10&sort=desc')
        .then(response => response.json())
        .then(txs => this.props.dispatch(updateHistory(txs)))
    }
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
    txs.map((tx, index) => {
      return (
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
      )
    });
  }

  render () {
    return (
      <div className="tx-list">
        { this.list(this.props.history) }
      </div>
    )
  }
}

export default connect(({ connected, address, history }) => ({ connected, address, history }))(TransactionList);
