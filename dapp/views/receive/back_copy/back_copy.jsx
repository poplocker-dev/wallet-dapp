import React               from 'react'
import { copyToClipboard } from 'lib/helpers'
import { Button }          from '@poplocker/react-ui'
import { toast }           from 'react-toastify'

class BackCopy extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBack() {
    window.history.back();
  }

  handleCopy() {
    copyToClipboard(this.props.address);
    toast.info('Address copied to clipboard');
  }

  render () {
    return (
      <div className="back-copy buttons--2row">
        <Button kind="light" icon="back" onClick={this.handleBack.bind(this)}>Back</Button>
        <Button kind="alt" icon="copy-clipboard" onClick={this.handleCopy.bind(this)}>Copy Address</Button>
      </div>
    )
  }
}

export default BackCopy;
