import React       from 'react'
import { Button }  from '@poplocker/react-ui'

import './send_receive.css'

const SendReceive = () => (
  <div className="send-receive buttons--2row">
    <Button kind="alt" icon="arrow" onClick={handleReceive}>Receive</Button>
    <Button icon="arrow-up" onClick={handleSend}>Send</Button>
  </div>
);

const handleReceive = () => {
  window.R.go(window.R.to_path('receive'));
}

const handleSend = () => {
  window.R.go(window.R.to_path('send'));
}

export default SendReceive;
