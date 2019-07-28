import React                from 'react'
import { Button, Spinning } from '@poplocker/react-ui'

import './waiting.css'

const Waiting = ({ message, emojis, onCancel }) => (
  <div className="subview waiting-subview">
    <Spinning/>
    <div className="emojis">
      { emojis }
    </div>
    <div className="message">
      { message }
    </div>
    <div className="buttons--1row button">
      <Button tabIndex={-1}
              type="button"
              icon="close"
              kind="reject"
              onClick={onCancel}>
        Cancel
      </Button>
    </div>
  </div>
);

export default Waiting;
