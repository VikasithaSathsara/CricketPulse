import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
// import ico from "../../assets/ico.jpg";

function Navbar() {
    return (
        <nav class="navbar">
            <div class="nav">
                {/* <div class="logo">
                    <a href="/">
                        <img src={ico} alt="" />
                    </a>
                </div> */}

                <ul class="menu">
                    <li>
                        <NavLink to="/" activeClassName="active-page">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="nav-link">
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className="nav-link">
                            Login
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
