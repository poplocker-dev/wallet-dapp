import React   from 'react'
import './checkbox.css'

const Checkbox = (props) => (
  <label className={props.className}>
    <input {...props} className="checkbox" type="checkbox" />
    {props.label}
  </label>
)

export default Checkbox;
