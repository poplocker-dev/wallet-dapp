import React       from 'react'
import { connect } from 'react-redux'
import QRCode      from './qr_code'
import BackCopy    from './back_copy'

import './receive.css'

const Receive = ({ address }) => {
  return (
    <div className="receive-panel">
      <div className="receive-title">Receive</div>
      <QRCode address={address}/>
      <BackCopy/>
    </div>
  )
}

export default connect(({ address }) => ({ address }))(Receive);
