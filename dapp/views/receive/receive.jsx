import React       from 'react'
import { connect } from 'react-redux'
import QRCode      from './qr_code'
import BackCopy    from './back_copy'
import coinbase    from '@poplocker/react-ui/assets/coinbase.svg'
import shapeshift  from '@poplocker/react-ui/assets/shapeshift.svg'
import forward     from '@poplocker/react-ui/assets/back.svg'

import './receive.css'

const Receive = ({ address }) => {
  return (
    <div className="receive-panel">
      <div className="receive-title">Receive</div>
      <div className="address-qrcode">
        <div className="address">
          <div className="title">
            Your Address
          </div>
          <div className="value">
            {address}
          </div>
        </div>
        <QRCode address={address}/>
      </div>
      <a className="link" href={process.env.COINBASE_URL} target="_blank">
        <img className="logo" src={coinbase} alt="Coinbase logo"/>
        <div className="text">Buy on Coinbase</div>
        <img className="forward" src={forward} alt="go"/>
      </a>
      <a className="link" href={process.env.SHAPESHIFT_URL} target="_blank">
        <img className="logo" src={shapeshift} alt="Shapeshift logo"/>
        <div className="text">Trade with Shapeshift</div>
        <img className="forward" src={forward} alt="go"/>
      </a>
      <BackCopy address={address}/>
    </div>
  )
}

export default connect(({ address }) => ({ address }))(Receive);
