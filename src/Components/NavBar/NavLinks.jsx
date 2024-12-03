// Lidia


import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';


// Navigation links for mobile and desktop
const NavLinks = ({ closeMenu }) => {
    return (
        <nav className="NavLinks">
            <ul>
            <li>
                    <Link to="/" onClick={closeMenu}>Home</Link>
                </li>
                <li>
                    <Link to="/acc" onClick={closeMenu}>My Account</Link>
                </li>
                <li>
                    <Link to="/contact" onClick={closeMenu}>Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavLinks;
