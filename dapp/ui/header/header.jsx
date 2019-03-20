import React        from 'react'
import Balance      from 'ui/balance'
import LockerButton from './locker_button'

import './header.css'

const Header = () => (
  <div className="header">
    <div className="balance-info">
      <div className="title">
        Your total balance
      </div>
      <Balance/>
    </div>
    <LockerButton/>
  </div>
);

export default Header;
