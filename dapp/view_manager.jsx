import React        from 'react'
import * as R       from 'pro-router/standalone'
import * as _       from 'lodash'
import Tabs         from 'ui/tabs'
import Transactions from 'views/transactions'
import Send         from 'views/send'
import Receive      from 'views/receive'
import SmartLocker  from 'views/smartlocker'

class ViewManager extends React.Component {
  constructor (props) {
    super(props);

    R.init({
      root: 'transactions',
      views: ['transactions', 'send', 'receive', 'smartlocker'],
      render: () => {this.forceUpdate(); this.render()},
      helpers: _
    });
  }

  view (name) {
    switch (name) {

      case 'transactions':
        return <Transactions/>

      case 'send':
        return <Send/>

      case 'receive':
        return <Receive/>

      case 'smartlocker':
        return <SmartLocker/>

      default:
        return (
          <div className="view not-found">
            Page not found
          </div>
        )
    }
  }

  render () {
    return (
      <>
        <Tabs/>
        { this.view(window.R.view) }
      </>
    )
  }
}

export default ViewManager;
