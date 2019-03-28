import React        from 'react'
import { connect }  from 'react-redux'
import CreateOrLink from './create_or_link'
import PendingAuth  from './pending_auth'

const SmartLocker = ({ locker }) => {
  switch (locker.status) {
    case 'simple':
      return <CreateOrLink/>
    case 'pending':
      return <PendingAuth/>
    default:
      return (<div>Not implemented</div>);
  }
}

export default connect(({ locker }) => ({ locker }))(SmartLocker);
