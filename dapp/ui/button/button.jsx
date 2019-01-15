import React from 'react'
import cl from 'classnames'
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
    <div className={`icon icon--${props.icon}`}></div>
  </button>
);

export default Button;
