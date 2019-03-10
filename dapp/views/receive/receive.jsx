import React       from 'react'
import { connect } from 'react-redux'
import QRCode from './qr_code'

import './receive.css'

const Receive = ({ address }) => (
  <QRCode address={address}/>
);

export default connect(({ address }) => ({ address }))(Receive);
