import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <div className="navbar">
            <li className="flmdlogo"><img src="./flowmodoro_logo.jpg" width="30px" height="30px"/></li>
            <Link to="/" className="navbar-item"> Flowmodoro </Link>
            <Link to="/timer" className="navbar-item"> Timer </Link>
            <Link to="/todolist" className="navbar-item"> To-do List </Link>
            <Link to="/news" className="navbar-item"> News </Link>
        </div>
    );
}

export default Navbar;