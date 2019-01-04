import React        from 'react'
import FancyCircles from 'ui/circles'
import StatusBar    from 'ui/status_bar'
import Balance      from 'ui/balance'

import './frame.css'

class Frame extends React.Component {
  render () {
    return (

      <div className="frame">
        <div className="header">
          <StatusBar/>
          <div className="title">
            Your total balance
          </div>
          <Balance/>
        </div>
        <FancyCircles number="8"/>

        { this.props.children }

      </div>
    )
  }
}

export default Frame;
