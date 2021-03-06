import React from 'react'
import QR    from 'qrcode'

class QRCode extends React.Component {
  constructor (props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount () {
    this.updateCanvas(this.props.address);
  }

  componentWillUpdate (nextProps) {
    this.updateCanvas(nextProps.address);
  }

  updateCanvas (address) {
    if (address) {
      QR.toCanvas(this.canvas.current, address, {scale: 2});
    }
  }

  render () {
    return (
      <div className="qr-code">
        <canvas ref={this.canvas} title={this.props.address}/>
      </div>
    )
  }
}

export default QRCode;
