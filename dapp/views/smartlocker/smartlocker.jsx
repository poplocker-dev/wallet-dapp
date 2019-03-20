import React       from 'react'
import { connect } from 'react-redux'

class SmarLocker extends React.Component {
  render () {
    return (
      <div className="smartlocker-view">
        Smart Locker View.
      </div>
    );
  }
}

export default connect()(SmarLocker);
