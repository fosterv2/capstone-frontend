import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = ({ loggedIn, signOut }) => {
    return(
        <div className="navbar">
            <div><NavLink to="/" exact><img src="https://i.imgur.com/CeNqBPn.png" alt="cat-logo" /></NavLink></div>
            <div><NavLink to="/about">About</NavLink></div>
            <div><NavLink to="/" exact>Home</NavLink></div>
            {loggedIn ? <div><NavLink to="/new_post" exact>Make a Post</NavLink></div> : null}
            <div>{loggedIn ?
            <NavLink to="/login" exact onClick={signOut}>Sign Out</NavLink>
            : <NavLink to="/login">Login</NavLink>
            }</div>
        </div>
    )
}

export default Navbar
