// DesktopNavigation
import NavLinks from './NavLinks';
import './NavBar.css';
import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import DarkModeToggle from './DarkMode';

const DesktopNavigation = () => {

    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }, [theme]);
  
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };
    return (
        <nav className="DesktopNavigation">
            <Link to="/">
                <h2 className="logo">VolunteerAarhus</h2>
            </Link>
            <NavLinks />
                  {/* Theme Toggle Button */}
                  <DarkModeToggle/>
        </nav>
    );
};

export default DesktopNavigation;
