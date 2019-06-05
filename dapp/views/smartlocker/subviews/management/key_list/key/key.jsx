import React                                     from 'react'
import { connect }                               from 'react-redux'
import { bindActionCreators }                    from 'redux'
import { Icon }                                  from '@poplocker/react-ui'
import { addressToEmoji }                        from 'lib/helpers'
import { selectAuthorizedKey, selectPendingKey } from 'lib/store/actions'

import './key.css'

class Key extends React.Component {
  keyHeader () {
    return (
      <div className="key-header">
        <div className={`key-indicator--${this.props.status}`}>
          <Icon glyph={`${this.props.status == 'pending'? 'pending' : 'tick'}`}/>
        </div>
        <div className="key-info">
          <div className="key-name">
            { this.props.name }
          </div>
          <div className={`key-badge key-badge--${this.props.status}`}>
            { this.props.status == 'device'? 'this device' : this.props.status }
          </div>
        </div>
      </div>
    );
  }

  keyDetails () {
    if (this.props.status == 'pending' && this.props.isSelected)
      return (
        <div className="key-details">
          <div className="emojis">
            { addressToEmoji(this.props.address) }
          </div>
          <div className="timestamp">
            { this.time(this.props.timeStamp) }
          </div>
        </div>
      );
    else
      return null;
  }

  render () {
    return (
      <div className={`key key--${this.props.status} ${this.props.isSelected? 'selected' : ''}`} onClick={this.handleSelect.bind(this)}>
        { this.keyHeader() }
        { this.keyDetails() }
      </div>
    );
  }

  time (utime) {
    const date = new Date(utime).toLocaleDateString();
    const time = new Date(utime).toLocaleTimeString();
    return date.split('/').join('-') + ' ' + time.toLowerCase();
  }

  handleSelect () {
    this.props.status == 'pending'? this.props.selectPendingKey(this.props.address) : this.props.selectAuthorizedKey(this.props.address);
  }
}

const mapState = ({ keys }, props) => ({
  isSelected: props.address == (props.status == 'pending'? keys.selectedKey.pending : keys.selectedKey.authorized)
});

const mapDispatch = dispatch => ({
  selectAuthorizedKey : bindActionCreators(selectAuthorizedKey, dispatch),
  selectPendingKey : bindActionCreators(selectPendingKey, dispatch)
});

export default connect(mapState, mapDispatch)(Key);
