import React from 'react'
import Button from 'ui/button'

import './send_tokens.css'

const SendTokens = () => (
  <div className="send-tokens">
    <Button icon="arrow">Receive Money</Button>
    <Button icon="arrow-up">Send Money</Button>
  </div>
);

export default SendTokens;
