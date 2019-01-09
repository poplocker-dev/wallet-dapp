import React from 'react'
import QR    from 'qrcode'

class QRCode extends React.Component {
  constructor (props) {
    super(props);
    this.cvs = React.createRef();
  }
  
  componentDidMount () {
    QR.toCanvas(this.cvs.current, this.props.address);
  }
  
  render () {
    return (
      <div className="qr-code">
        <canvas ref={this.cvs}/>
      </div>
    )
  }
}

export default QRCode;
