import React   from 'react'
import Balance from 'ui/balance'
import Locker  from './locker'

import './header.css'

const Header = () => (
  <div className="header">
    <div className="balance-info">
      <div className="title">
        Your total balance
      </div>
      <Balance/>
    </div>
    <Locker/>
  </div>
);

export default Header;
