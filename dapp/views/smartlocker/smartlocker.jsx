import React        from 'react'
import { connect }  from 'react-redux'
import CreateOrLink from './create_or_link'

const SmartLocker = ({ locker }) => {
  switch (locker.status) {
    case 'simple':
      return <CreateOrLink/>
    default:
      return (<div>Not implemented</div>);
  }
}

export default connect(({ locker }) => ({ locker }))(SmartLocker);
