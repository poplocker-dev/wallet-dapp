import React from 'react'
import {connect} from 'react-redux'

const History = ({ history }) => (
  <div className="tx-history">
  { history.map(transaction =>
    <div className="tx">
      { transaction }
    </div>
  ) }
  </div>
)

export default connect(({ history }) => ({ history }))(History);
