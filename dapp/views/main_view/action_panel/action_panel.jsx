import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Button from 'ui/button'

import './action_panel.css'

const SendTokens = ({ handleSend }) => (
  <div className="send-tokens">
    <Button icon="arrow">Receive Money</Button>
    <Button icon="arrow-up" onClick={handleSend.bind(this)}>Send Money</Button>
  </div>
);

const mapDispatch = (dispatch) => ({
  handleSend: () => {
    dispatch(push('/send'));
  }
});

export default connect(null, mapDispatch)(SendTokens);
