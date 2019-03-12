import React      from 'react'
import { Button } from '@poplocker/react-ui'

import './back_copy.css'

const BackCopy = () => (
  <div className="back-copy">
    <Button kind="light" icon="arrow" onClick={handleBack}>Back</Button>
    <Button kind="alt" icon="arrow" onClick={handleCopy}>Copy Address</Button>
  </div>
);

const handleBack = () => {
  window.history.back();
}

const handleCopy = () => {
  // TODO:
}

export default BackCopy;
