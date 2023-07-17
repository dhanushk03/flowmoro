import React from "react";

const Navbar = (props) => {
    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li className="flmdlogo"><img src="./flowmodoro_logo.jpg" width="30px" height="30px"/></li>
                    <li className="homepage">Flowmodoro</li>
                    <li className="navbar-right">Timer</li>
                    <li className="navbar-right">To-do List</li>
                    <li className="navbar-right">News</li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;