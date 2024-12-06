// Mobile navigation
import NavLinks from "./NavLinks";
import './NavBar.css';
import { MdOutlineMenu, MdClose } from 'react-icons/md';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkMode';

const MobileNavigation = () => {
    const [click, setClick] = useState(false); // To toggle the menu state

    const closeMenu = () => setClick(false);

    // Function to toggle the state of the menu
    const handleMenuToggle = () => {
        setClick(prevState => !prevState);
    };

    return (
        <nav className="MobileNavigation">
            <Link to="/" onClick={closeMenu}><h2 className="logo">VolunteerAarhus</h2></Link>
            
            {/* Theme Toggle Button */}
            <DarkModeToggle />
            
            {click ? (
                <MdClose className="HamburgerMenu" size="30px" color="black" onClick={handleMenuToggle} />
            ) : (
                <MdOutlineMenu className="HamburgerMenu" size="30px" color="black" onClick={handleMenuToggle} />
            )}
            
            {click && <NavLinks closeMenu={closeMenu} />}
        </nav>
    );
};

export default MobileNavigation;
