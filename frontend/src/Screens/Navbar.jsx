import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav>
    <ul>
      <li>
        <NavLink to="/" >Registration</NavLink>
      </li>
      <li>
        <NavLink to="/employee" >Employee List</NavLink>
      </li>
    </ul>
  </nav>
  )
}

export default Navbar