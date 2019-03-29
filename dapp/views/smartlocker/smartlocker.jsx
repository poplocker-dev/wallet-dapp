import React        from 'react'
import { connect }  from 'react-redux'
import CreateOrLink from './create_or_link'
import PendingAuth  from './pending_auth'
import Deploying    from './deploying'

const SmartLocker = ({ locker }) => {
  switch (locker.status) {
    case 'simple':
      return <CreateOrLink/>
    case 'pending':
      if (locker.name)
        return <PendingAuth/>
      else
        return <Deploying/>
    default:
      return (<div>Not implemented</div>);
  }
}

export default connect(({ locker }) => ({ locker }))(SmartLocker);
