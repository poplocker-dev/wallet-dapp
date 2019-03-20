import React from 'react'

import './tabs.css'

class Tabs extends React.Component {

  isCurrent (assertion) {
    return assertion ? 'tab--current' : '';
  }

  render () {
    return (
      <div className="tabs">
        <div className={`tab ${this.isCurrent(window.R.view != 'smartlocker')}`}>
          Transactions
        </div>
        <div className={`tab ${this.isCurrent(window.R.view == 'smartlocker')}`}>
          SmartLocker
        </div>
      </div>
    );
  }
}

export default Tabs;
