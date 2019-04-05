import React        from 'react'
import { connect }  from 'react-redux'
import { flags } from 'lib/helpers'
import CreateOrLink from './create_or_link'
import PendingAuth  from './pending_auth'
import Deploying    from './deploying'

const SmartLocker = ({ locker }) => {
  switch (locker.status) {
    case 'simple':
      if (flags.creatingLocker)
        return <Deploying/>
      else
        return <CreateOrLink/>
    case 'pending':
      return <PendingAuth/>
    default:
      return <CreateOrLink/>
  }
}

export default connect(({ locker }) => ({ locker }))(SmartLocker);
