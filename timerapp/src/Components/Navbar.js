import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./flowmoro_logo.png";

const Navbar = (props) => {
    return (
        <div className="navbar">
                <NavLink to="/" className={"navbar-item navbar-left"} activeClassName="active" activeStyle={{ color: "orange" }} id="homepage"> <li className="flmdlogo"><img src={logo} alt="logo" width="50px" height="50px"/></li>&#160;&#160;&#160;Flowmoro</NavLink>
                <NavLink to="/todolist" className={"navbar-item navbar-right"} activeClassName="active" activeStyle={{ color: "orange" }} id="todolistnav"> To-do List </NavLink>
                <NavLink to="/timer" className={"navbar-item navbar-right"} activeClassName="active" activeStyle={{ color: "orange" }} id="timer"> Timer </NavLink>
                <NavLink to="/focuslog" className={"navbar-item navbar-right"} activeClassName="active" activeStyle={{ color: "orange" }} id="studylognav"> Focus Log </NavLink>
                <NavLink to="/news" className={"navbar-item navbar-right"} activeClassName="active" activeStyle={{ color: "orange" }} id="news"> News+ </NavLink>
        </div>
    );
}

export default Navbar;