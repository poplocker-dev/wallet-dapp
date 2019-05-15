import React   from 'react'
import './checkbox.css'

const Checkbox = (props) => (
  <label {...props}>
    <input className="checkbox" type="checkbox"/>
    {props.label}
  </label>
)

export default Checkbox;
