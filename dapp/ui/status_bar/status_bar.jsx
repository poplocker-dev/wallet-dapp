import React from 'react'
import { connect } from 'react-redux'

import './status_bar.css'

const StatusBar = ({ connection }) => (
  <div className="status-bar">
    <div className={`indicator indicator--${status(connection)}`}></div>
    <div className="status">
      { status(connection) }
    </div>
  </div>
)

const status = (connection) => {
  switch (connection) {
    case -1:
      return 'connecting'
    case 0:
      return 'disconnected'
    case 1:
      return 'connected'
  }
}

export default connect(({ connection }) => ({ connection }))(StatusBar);
