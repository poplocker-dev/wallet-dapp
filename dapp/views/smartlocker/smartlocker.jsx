import React        from 'react'
import { connect }  from 'react-redux'
import { flags }    from 'lib/helpers'
import { Bouncing } from '@poplocker/react-ui'

import CreateOrLinkSubview from './subviews/create_or_link'
import PendingSubview      from './subviews/pending_auth'
import DeployingSubview    from './subviews/deploying'
import ManagementSubview   from './subviews/management'

import './smartlocker.css'

const SmartLocker = ({ locker }) => {
  switch (locker.status) {
    case 'simple':
      if (flags.creatingLocker)
        return <DeployingSubview name={flags.creatingLocker}/>
      else
        return <CreateOrLinkSubview/>
    case 'pending':
      return <PendingSubview/>
    case 'smart':
      return <ManagementSubview/>
    default:
      return (
        <div className="loading-subview">
          <Bouncing/>
        </div>
      )
  }
}

export default connect(({ locker }) => ({ locker }))(SmartLocker);
