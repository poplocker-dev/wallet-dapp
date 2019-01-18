import React      from 'react'
import { Button } from '@poplocker/react-ui'

import './send_receive.css'

const SendReceive = () => (
  <div className="send-tokens">
    <Button icon="arrow-up" onClick={handleSend}>Send</Button>
  </div>
);

const handleSend = () => {
  window.R.write('slidein', true);
  window.R.go(window.R.to_path('send-tokens'));
}

export default SendReceive;
