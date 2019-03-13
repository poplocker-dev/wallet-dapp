import React from 'react'
import { connect } from 'react-redux'

import './status_bar.css'

const StatusBar = ({ connection, address }) => (
  <div className="status-bar">
    <div className={`indicator indicator--${status(connection, address)}`}></div>
    <div className="status">
      { status(connection, address).replace('-', ' ') }
    </div>
  </div>
)

const status = (connection, address) => {
  switch (connection) {
    case -1:
      return 'connecting';
    case 0:
      return 'disconnected';
    case 1:
      if (address.length > 0) return 'connected';
      else return 'no-account'
  }
}

export default connect(({ connection, address }) => ({ connection, address }))(StatusBar);
