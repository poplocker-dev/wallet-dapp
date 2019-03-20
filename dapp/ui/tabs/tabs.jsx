import React from 'react'

import './tabs.css'

const { R } = window;

class Tabs extends React.Component {

  isCurrent (assertion) {
    return assertion ? 'tab--current' : '';
  }

  render () {
    return (
      <div className="tabs">
        <div className={`tab ${this.isCurrent(window.R.view != 'smartlocker')}`}
             onClick={this.handleTransactionsClick.bind(this)}>
          Transactions
        </div>
      <div className={`tab ${this.isCurrent(window.R.view == 'smartlocker')}`}
           onClick={this.handleSmartLockerClick.bind(this)}>
          SmartLocker
        </div>
      </div>
    );
  }

  handleSmartLockerClick () {
    R.go(R.to_path('smartlocker'));
  }

  handleTransactionsClick () {
    R.go(R.to_path('transactions'));
  }
}

export default Tabs;
