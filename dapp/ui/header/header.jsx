import React   from 'react'
import Balance from 'ui/balance'
import Tabs    from './tabs'

import './header.css'

const Header = () => (
  <div className="header">
    <div className="balance-info">
      <div className="title">
        Your total balance
      </div>
      <Balance/>
    </div>
    <Tabs/>
  </div>
);

export default Header;