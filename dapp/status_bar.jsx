import React from 'react'
import { connect } from 'react-redux'

const StatusBar = ({ connected }) => (
  <div className="status-bar">
    <p>
      { connected ? 'Connected' : 'Disconnected' }
    </p>
  </div>
)

const mapStore = ({ connected }) => ({ connected })

export default connect(mapStore)(StatusBar);
