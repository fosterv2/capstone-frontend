import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return(
        <div className="navbar">
            <img src="" width="" height="" alt="cat-logo" />
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/about">About</NavLink>
        </div>
    )
}

export default Navbar
