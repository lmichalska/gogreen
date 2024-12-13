import './NavBar.css';
import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    // State to manage whether dark mode is enabled
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check if the theme is saved in localStorage or default to dark mode
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme === "dark" : true;  // Default to dark mode if no preference
    });

    // Update theme in the document and localStorage when the mode changes
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]); // Re-run when 'isDarkMode' changes

    // Toggle dark mode
    const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);

    return (
        <div className="dark-mode-toggle">
            {/* Checkbox for toggling dark mode */}
            <input
                className="input"
                type="checkbox"
                id="dark-mode-toggle"
                checked={isDarkMode}
                onChange={toggleDarkMode}
            />
            <label htmlFor="dark-mode-toggle" className="label">
                <span className="circle"></span> {/* Styled slider */}
            </label>
        </div>
    );
};

export default DarkModeToggle;
