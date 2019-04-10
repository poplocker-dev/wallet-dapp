import React        from 'react'
import { connect }  from 'react-redux'
import { flags }    from 'lib/helpers'
import { Bouncing } from '@poplocker/react-ui'
import CreateOrLink from './create_or_link'
import PendingAuth  from './pending_auth'
import Deploying    from './deploying'
import Management    from './management'

const SmartLocker = ({ locker }) => {
  switch (locker.status) {
    case 'simple':
      if (flags.creatingLocker)
        return <Deploying name={flags.creatingLocker}/>
      else
        return <CreateOrLink/>
    case 'pending':
      return <PendingAuth/>
    case 'smart':
      return <Management/>
    default:
      return <Bouncing/>
  }
}

export default connect(({ locker }) => ({ locker }))(SmartLocker);
