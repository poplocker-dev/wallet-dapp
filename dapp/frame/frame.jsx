import React             from 'react'
import StatusBar         from 'ui/status_bar'
import FancyCircles      from 'ui/circles'
import Header            from 'ui/header'
import { CSSTransition } from 'react-transition-group'
import Connection        from './connection'

import './frame.css'

class Frame extends React.Component {
  render () {
    return (
      <CSSTransition timeout={500} classNames="slidein" appear={true} in={true}>
        <div className="frame">
          <StatusBar/>
          <FancyCircles number='8'/>
          <Connection>
            <div className="view">
              <Header/>
              <div className="subview">
                { this.props.children }
              </div>
            </div>
          </Connection>
        </div>
      </CSSTransition>
    )
  }
}

export default Frame;
