import React from 'react'
import { NavLink } from 'react-router-dom'

const Navlinks = () => {
    return (
        <div className='navLinksContainer'>
            <NavLink to='/' >Home</NavLink >
            <NavLink to='/registerUser' >Register</NavLink >
            <NavLink to='/loginUser'>Login</NavLink >
            <NavLink className='logOutBtn'>Log out</NavLink >
        </div>
    )
}

export default Navlinks