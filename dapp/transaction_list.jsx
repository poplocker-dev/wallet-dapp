import React        from 'react'
import { connect }  from 'react-redux'

class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        transactionList: {result: []}
      };
    setTimeout(() => this.updateTransactionList(), 1000);
  }

  updateTransactionList() {
    if (this.props.connected) {
      fetch('https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=' + this.props.address +'&page=1&offset=10&sort=desc')
        .then(response => response.json())
        .then(json => this.setState({transactionList: json}))
    }
    setTimeout(() => this.updateTransactionList(), 1000);
  }

  render () {
    const { transactionList } = this.state;

    return (
      <div className="tx-list">
        { transactionList.result.map(tx =>
          <div className="tx">
            From:{ tx.from } /
            To:{ tx.to } /
            Value:{ tx.value } /
            TimeStamp:{ tx.timeStamp } /
            isError:{ tx.isError }
          </div>
        ) }
      </div>
    )
  }
}

export default connect(({ transactionList, connected, address }) => ({ transactionList, connected, address }))(TransactionList);
