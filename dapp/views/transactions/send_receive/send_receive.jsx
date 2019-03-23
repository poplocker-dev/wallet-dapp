import React       from 'react'
import { connect } from 'react-redux'
import { Button }  from '@poplocker/react-ui'

const SendReceive = ({ sendDisabled }) => (
  <div className="send-receive buttons--2row">
    <Button kind="alt" icon="arrow" onClick={handleReceive}>Receive</Button>
    <Button icon="arrow-up" onClick={handleSend} disabled={sendDisabled}>Send</Button>
  </div>
);

const handleReceive = () => {
  window.R.go(window.R.to_path('receive'));
}

const handleSend = () => {
  window.R.go(window.R.to_path('send'));
}

const mapStore = ({ locker }) => ({
  sendDisabled: locker.status == 'pending'
});

export default connect(mapStore)(SendReceive);
