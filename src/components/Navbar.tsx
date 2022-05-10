import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <div className='nav-wrapper purple darken-2 px1'>
        <NavLink to='/' className='brand-logo'>
          React + TypeScript
        </NavLink>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <NavLink to='/'>To-do List</NavLink>
          </li>
          <li>
            <NavLink to='/about'>About</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
