import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <div className="navbar">
                <Link to="/" className="navbar-item navbar-left" activeClassName="active" activeStyle={{ color: "blue" }} id="homepage"> <li className="flmdlogo"><img src="./flowmodoro_logo.jpg" alt="logo" width="30px" height="30px"/></li>&#160;&#160;&#160;Flowmodoro</Link>
                <Link to="/timer" className="navbar-item navbar-right" activeClassName="active" activeStyle={{ color: "blue" }} id="timer"> Timer </Link>
                <Link to="/todolist" className="navbar-item navbar-right" activeClassName="active" activeStyle={{ color: "blue" }} id="todolistnav"> To-do List </Link>
                <Link to="/studylog" className="navbar-item navbar-right" activeClassName="active" activeStyle={{ color: "blue" }} id="studylognav"> Study Log </Link>
                <Link to="/news" className="navbar-item navbar-right" activeClassName="active" activeStyle={{ color: "blue" }} id="news"> News </Link>
        </div>
    );
}

export default Navbar;