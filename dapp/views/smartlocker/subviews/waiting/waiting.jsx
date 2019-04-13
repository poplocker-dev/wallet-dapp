import React                from 'react'
import { Button, Spinning } from '@poplocker/react-ui'

import './waiting.css'

const Waiting = ({ message, onCancel }) => (
  <div className="subview waiting-subview">
    <Spinning/>
    <div className="message">
      { message }
    </div>
    <Button tabIndex={-1}
            type="button"
            icon="close"
            kind="reject"
            onClick={onCancel}>
      Cancel
    </Button>
  </div>
);

export default Waiting;
