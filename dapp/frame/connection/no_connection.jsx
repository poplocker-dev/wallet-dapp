import React from 'react'

import './no_connection.css'

const NoAddress = () => (
  <div className="no-connection no-address">
    No account detected or account is locked
    <br/><br/>
    Please create an account or grant connection request
  </div>
);

const NoExtension = () => (
  <div className="no-connection no-extension">
    Not connected to the Ethereum network
    <br/><br/>
    Please install
    <br/>
    <a href={config.constants.POPLOCKER_URL}>PopLocker</a>
  </div>
);

export { NoAddress, NoExtension };
