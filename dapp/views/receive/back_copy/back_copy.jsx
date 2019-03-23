import React      from 'react'
import { Button } from '@poplocker/react-ui'

class BackCopy extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBack() {
    window.history.back();
  }

  handleCopy() {
    const text = document.createElement("textarea");
    text.value = this.props.address;

    document.body.appendChild(text);
    text.select();
    document.execCommand("copy");

    document.body.removeChild(text);
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
