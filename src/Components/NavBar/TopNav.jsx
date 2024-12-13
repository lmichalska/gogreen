// Mobile navigation
import './NavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkMode';

const NavBar = () => {
    return (
        <nav>
            <Link to="/"><h2 className="logo">Sortify</h2></Link>
            <DarkModeToggle />
        </nav>
    );
};

export default NavBar;
