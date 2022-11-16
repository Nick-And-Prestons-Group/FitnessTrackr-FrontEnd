import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <Link to="activities">Activities</Link>
            <Link to="routines">Routines</Link>
            <Link to="login">Log In</Link>
            <Link to="profile">Profile</Link>
        </nav>
    )
};

export default Navbar;