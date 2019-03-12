import React                               from 'react'
import { bindActionCreators }              from 'redux'
import { connect }                         from 'react-redux'
import Transaction                         from './transaction'
import { Preloader, Bouncing }             from '@poplocker/react-ui'
import { updateHistory, upPage, downPage } from 'lib/store/actions'

import './transactions_list.css'

class TransactionList extends React.Component {
  componentDidMount() {
    this.fetchHistory(1).then(this.props.updateHistory);
  }

  fetchHistory(page) {
    return fetch(
      `${process.env.ETHERSCAN_URL}&address=${this.props.address}&page=${page}`
    )
      .then(response => response.json())
      .then(response => response.result);
  }

  render() {
    return (
      <div className="transactions-list">
        <button onClick={this.prev.bind(this)} disabled={this.prevDisabled()}>
          Prev
        </button>
        <div className="pageable">{this.list()}</div>
        <button onClick={this.next.bind(this)} disabled={this.nextDisabled()}>
          Next
        </button>
      </div>
    );
  }

  list() {
    return (
      <Preloader value={this.props.items != null} loader={Bouncing}>
        {this.visibleTxs(this.props.page).map((tx, index) => (
          <Transaction tx={tx} key={index} />
        ))}
      </Preloader>
    );
  }

  next() {
    if (this.props.page == this.props.lastPage)
      this.fetchHistory(this.props.page + 1)
        .then(this.props.updateHistory)
        .then(this.props.upPage);
    else this.props.upPage();
  }

  prev() {
    this.props.downPage();
  }

  nextDisabled() {
    return this.cursor(this.props.page).to >= this.props.items.length;
  }

  prevDisabled() {
    return this.props.page == 1;
  }

  visibleTxs(page) {
    const { from, to } = this.cursor(page);
    return this.props.items.slice(from, to);
  }

  cursor(page) {
    const from = page == 1 ? 0 : (page - 1) * 4;
    const to = from + 5;

    return { from, to };
  }
}

const mapDispatch = dispatch => ({
  updateHistory: bindActionCreators(updateHistory, dispatch),
  upPage: bindActionCreators(upPage, dispatch),
  downPage: bindActionCreators(downPage, dispatch)
});

const mapStore = ({ address, history }) => ({
  address,
  ...history,
  items: history.items || []
});

export default connect(
  mapStore,
  mapDispatch
)(TransactionList);
