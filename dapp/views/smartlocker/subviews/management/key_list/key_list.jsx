import React from 'react'
import Key   from './key'

import './key_list.css'

class KeyList extends React.Component {
  constructor (props) {
    super(props);
    this.state = { keys: [] };
  }

  async componentDidMount () {
    const keys = await this.fetchKeys();
    this.setState({ keys });
      //this.setState({ keys: keys.filter(key => key.name.length > 0) });
    //});
  }

  fetchKeyList () {
    // TODO: remove null keys
    return this.props.smartLocker.getKeyList();
  }

  fetchKeys () {
    return this.fetchKeyList()
               .then(keyList => {
                 return Promise.all(keyList.map(item => this.props.smartLocker.getKey(item)))
                   .then(keys => keys.map((item, index) => ({ address: keyList[index], name: item })))
               });
  }

  list () {
    // TODO: loading should not be a Key
    if (this.state.keys.length == 0)
      return (
       <Key name="Loading devices..." />
      )
    else {
      return this.state.keys.map((key, index) => (
        <Key address={key.address}
             name={key.name}
             selectedKey={this.props.selectedKey}
             handleSelect={this.props.handleSelect}
             key={index} />
      ))
    }
  }

  render () {
    return (
      <div>
        <div className="key-list">
          { this.list() }
        </div>
        <div className="fade-out"/>
      </div>
    )
  }
}

export default KeyList;
