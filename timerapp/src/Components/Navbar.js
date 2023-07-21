import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <li className="flmdlogo"><img src="./flowmodoro_logo.jpg" width="30px" height="30px"/></li>
                <Link to="/" className="navbar-item" id="homepage"> Flowmodoro </Link>
            </div>
            <div className="navbar-right">
                <Link to="/timer" className="navbar-item" id="timer"> Timer </Link>
                <Link to="/todolist" className="navbar-item" id="todolistnav"> To-do List </Link>
                <Link to="/news" className="navbar-item" id="news"> News </Link>
            </div>
        </div>
    );
}

export default Navbar;