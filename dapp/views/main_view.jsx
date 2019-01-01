import React from 'react'
import FancyCircles from 'ui/circles'

import './main_view.css'

class MainView extends React.Component {
  render () {
    return (
      <div className="view main-view">
        <FancyCircles number="8"/>
        <div className="title">
          Your total balance
        </div>
      </div>
    )
  }
}

export default MainView;
