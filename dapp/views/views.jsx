import React        from 'react'
import * as R       from 'pro-router/standalone'
import * as _       from 'lodash'

import Transactions from 'views/transactions'
import SendTokens   from 'views/send_tokens'

export default class Views extends React.Component {
  constructor (props) {
    super(props);

    R.init({
      root: 'transactions',
      views: ['transactions', 'send-tokens'],
      render: () => {this.forceUpdate(); this.render()},
      helpers: _
    });
  }

  page (name) {
    switch (name) {

      case 'transactions':
        return <Transactions/>

      case 'send-tokens':
        return <SendTokens/>

      default:
        return (
          <div className="not-found">
            Not Found
          </div>
        )
    }
  }

  render () {
    return (
      <>
        { this.page(window.R.view) }
      </>
    )
  }
}
