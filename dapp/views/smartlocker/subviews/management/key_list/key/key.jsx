import React    from 'react'
import { Icon } from '@poplocker/react-ui'

import './key.css'

class Key extends React.Component {
  render () {
    return (
      <div className={`key ${this.props.selectedKey && this.props.selectedKey == this.props.address? 'selected' : ''}`}
           onClick={e => this.props.handleSelect(e, this.props.address)}>
        <div className="key-indicator--authorized">
          <Icon glyph="tick"/>
        </div>
        <div className="key-info">
          <div className="key-name">
            { this.props.name }
          </div>
          <div className="key-badge--authorized">
            Authorized
          </div>
        </div>
      </div>
    );
  }
}

export default Key;
