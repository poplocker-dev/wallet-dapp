import React             from 'react'
import StatusBar         from 'ui/status_bar'
import Balance           from 'ui/balance'
import FancyCircles      from 'ui/circles' 
import { CSSTransition } from 'react-transition-group'
import Connection        from './connection'

import './frame.css'

class Frame extends React.Component {
  render () {
    return (
      <CSSTransition timeout={500} classNames="slidein" appear={true} in={true}>
        <div className="frame">
          <StatusBar/>
          <Connection>
          <FancyCircles number='8'/>
            <Header/>
            <div className="body">
              { this.props.children }
            </div>
          </Connection>
        </div>
      </CSSTransition>
    )
  }
}

export default Frame;
