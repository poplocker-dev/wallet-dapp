import React from 'react'
import { Button } from '@poplocker/react-ui'
import { rpc }                              from 'lib/rpc_calls'

import './no_connection.css'

const NoAddress = () => (
  <div className="no-connection no-address">
    No account detected
    <br/><br/>
    Please create an account
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

const NotUnlocked = ({ onUnlock }) => (
  <div className="no-connection not-unlocked">
    Account is locked
    <br/><br/>
    Unlock account and approve connection request

    <Button icon="tick" onClick={onUnlock}>
      Unlock Account
    </Button>
  </div>
);

export { NoAddress, NoExtension, NotUnlocked };
