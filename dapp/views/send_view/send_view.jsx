
import React from 'react'
import SendForm from './form'
import { CSSTransition } from 'react-transition-group'

import './send_view.css'

const SendView = () => {
  if (window.R.param('slidein')) {
    console.log('slide');
    return (
      <CSSTransition timeout={500} classNames="slide" onEnter={() => console.log('entered')}>
        <SendForm/>
      </CSSTransition>
    )
  }
}

export default SendView;
