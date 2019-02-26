import React             from 'react'
import StatusBar         from 'ui/status_bar'
import Balance           from 'ui/balance'
import { CSSTransition } from 'react-transition-group'

import Tabs from './tabs'
import './frame.css'

class Frame extends React.Component {
  render () {
    return (
      <CSSTransition timeout={500} classNames="slidein" appear={true} in={true}>
        <div className="frame">
          <div className="header">
            <StatusBar/>
            <div className="title">
              Your total balance
            </div>
            <Balance/>
          </div>
          <div className="body">
            <Tabs/>
            { this.props.children }
          </div>
        </div>
      </CSSTransition>
    )
  }
}

export default Frame;
