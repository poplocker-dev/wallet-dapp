import React       from 'react'
import { connect } from 'react-redux'
import QRCode from './qr_code'

import './receive_panel.css'

const ReceivePanel = ({ address }) => (
  <QRCode address={address}/>
);

export default connect(({ address }) => ({ address }))(ReceivePanel);
