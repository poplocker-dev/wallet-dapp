import React        from 'react'
import FancyCircles from 'ui/circles'
import StatusBar    from 'ui/status_bar'

import './view.css'

class View extends React.Component {
  render () {
    return (
      <div className="view">
        <StatusBar/>
        <FancyCircles number="8"/>
        { this.props.children }
      </div>
    )
  }
}

export default View;
