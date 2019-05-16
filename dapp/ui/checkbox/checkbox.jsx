import React   from 'react'
import './checkbox.css'

const Checkbox = (props) => (
  <label {...props}>
    <input className="checkbox" type="checkbox" checked={props.checked}/>
    {props.label}
  </label>
)

export default Checkbox;
