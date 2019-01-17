import React from 'react'

import './icon.css'

const Icon = (props) => (
  <div className="icon">
    <div className={`glyph glyph--${props.glyph}`}></div>
  </div>
);

export default Icon;
