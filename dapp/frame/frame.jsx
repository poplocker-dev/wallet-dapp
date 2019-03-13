import React             from 'react'
import StatusBar         from 'ui/status_bar'
import Balance           from 'ui/balance'
import FancyCircles      from 'ui/circles'
import { CSSTransition } from 'react-transition-group'

import Tabs         from './tabs'
import LockerButton from './locker_button'

import './frame.css'

class Frame extends React.Component {
  render () {
    return (
      <CSSTransition timeout={500} classNames="slidein" appear={true} in={true}>
        <div className="frame">
          <div className="header">
            <FancyCircles number='8'/>
            <StatusBar/>
            <div className="title">
              Your total balance
            </div>
            <Balance/>
            <LockerButton/>
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
