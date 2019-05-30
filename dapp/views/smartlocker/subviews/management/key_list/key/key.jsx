import React                                     from 'react'
import { connect }                               from 'react-redux'
import { bindActionCreators }                    from 'redux'
import { Icon }                                  from '@poplocker/react-ui'
import { selectAuthorizedKey, selectPendingKey } from 'lib/store/actions'

import './key.css'

class Key extends React.Component {
  render () {
    return (
      <div className={`key ${this.props.isSelected? 'selected' : ''}`} onClick={this.handleSelect.bind(this)}>
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
