import React                   from 'react'
import { bindActionCreators }  from 'redux'
import { connect }             from 'react-redux'
import Transaction             from './transaction'
import { Preloader, Bouncing } from '@poplocker/react-ui'
import { rpc }                 from 'lib/rpc_calls'
import { nextPage, prevPage }  from 'lib/store/actions'

import './transactions_list.css'

class TransactionList extends React.Component {
  componentDidMount() {
    this.props.dispatch(rpc.fetchTxHistory());
  }

  render() {
    return (
      <div className="transactions-list">
        <div className="pageable">{this.list()}</div>
        <div className="prevNext">
          <button className={this.prevDisabled()? "hidden" : "visible"} onClick={this.prev.bind(this)}>
            &lt;
          </button>
          <button className={this.nextDisabled()? "hidden" : "visible"} onClick={this.next.bind(this)}>
            &gt;
          </button>
        </div>
      </div>
    );
  }

  list() {
    if (this.props.items.length)  {
      return (
        <Preloader value={this.props.items != null} loader={Bouncing}>
          {this.visibleItems(this.props.page).map((tx, index) => (
            <Transaction tx={tx} key={index} />
            ))}
        </Preloader>
      )
    } else {
      return (
        <div className="no-transaction">There are no transactions yet</div>
      )
    }
  }

  next() {
    this.props.nextPage();
    this.props.dispatch(rpc.fetchTxHistory());
  }

  prev() {
    this.props.prevPage()
  }

  nextDisabled() {
    return this.cursor(this.props.page).to >= this.props.items.length;
  }

  prevDisabled() {
    return this.props.page == 1;
  }

  visibleItems(page) {
    const { from, to } = this.cursor(page);
    return this.props.items.slice(from, to);
  }

  cursor(page) {
    const from = (page - 1) * this.props.pageSize;
    const to = from + this.props.pageSize;

    return { from, to };
  }
}

const mapDispatch = dispatch => ({
  nextPage: bindActionCreators(nextPage, dispatch),
  prevPage: bindActionCreators(prevPage, dispatch),
  dispatch
});

const mapStore = ({ txHistory }) => ({
  ...txHistory,
  items: txHistory.items || []
});

export default connect(
  mapStore,
  mapDispatch
)(TransactionList);
