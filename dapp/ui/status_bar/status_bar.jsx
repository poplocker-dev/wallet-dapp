import React from 'react'
import { connect } from 'react-redux'

import './status_bar.css'

const StatusBar = ({ status }) => (
  <div className="status-bar">
    <div className={`indicator indicator--${status}`}></div>
    <div className="status">
      { status }
    </div>
  </div>
)

const mapStore = ({ connected }) => ({
  status: connected ? 'connected' : 'disconnected'
}); 

export default connect(mapStore)(StatusBar);
