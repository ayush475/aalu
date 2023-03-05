import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './header.css';
import {BrowserRouter, NavLink } from 'react-router-dom';
import { FaCode, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
	// const [open, setOpen] = useState(false);

	// const handleClick = () => {
	// 	setOpen(!open);
	// };

	// const closeMenu = () => {
	// 	setOpen(false);
	// };
	const [click, setClick] = React.useState(false);

	const handleClick = () => setClick(!click);
	const Close = () => setClick(false);

	return (
		<>
	<div>
  <div className={click ? "main-container" : ""} onClick={() => Close()} />
  <nav className="navbar" onClick={(e) => e.stopPropagation()}>
    <div className="nav-container">
      <NavLink exact to="/" className="nav-logo">
        bus-sewa
        <FaCode />
      </NavLink>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <NavLink
            exact
            to="/"
            activeClassName="active"
            className="nav-links"
            onClick={click ? handleClick : null}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            exact
            to="/admin"
            activeClassName="active"
            className="nav-links"
            onClick={click ? handleClick : null}
          >
            Admin
          </NavLink>
        </li>
		<li className="nav-item">
          <NavLink
            exact
            to="/Client"
            activeClassName="active"
            className="nav-links"
            onClick={click ? handleClick : null}
          >
            Client
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            exact
            to="/user"
            activeClassName="active"
            className="nav-links"
            onClick={click ? handleClick : null}
          >
            User-Data
          </NavLink>
        </li>
       
      </ul>
      <div className="nav-icon" onClick={handleClick}>
        {click ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  </nav>
</div>
		</>
	);
};

export default Header;
