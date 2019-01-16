import React from 'react'
import Button from 'ui/button'

import './send_receive.css'

const SendReceive = () => (
  <div className="send-tokens">
    <Button icon="arrow-up" onClick={handleSend}>Send Money</Button>
  </div>
);

const handleSend = () => {
  window.R.go(window.R.to_path('send-tokens'));
}

export default SendReceive;
