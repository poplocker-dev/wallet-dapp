import React from 'react'
import cl    from 'classnames'
import Icon  from 'ui/icon'

import './button.css'

const classes = (alt) => ({
  'btn': true,
  'btn--alt': alt
});

const Button = (props) => (
  <button className={cl(classes(props.alt))} {...props}>
    <div className="caption">
      { props.children }
    </div>
    <Icon glyph={props.icon}/>
  </button>
);

export default Button;
