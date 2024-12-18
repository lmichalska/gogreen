import './NavBar.css';
import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme === "dark" : true;
    });

    // Update theme
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);

    return (
        <div className="dark-mode-toggle">
            <input
                className="input"
                type="checkbox"
                id="dark-mode-toggle"
                checked={isDarkMode}
                onChange={toggleDarkMode}
            />
            <label htmlFor="dark-mode-toggle" className="label">
                <span className="circle"></span>
            </label>
        </div>
    );
};

export default DarkModeToggle;
