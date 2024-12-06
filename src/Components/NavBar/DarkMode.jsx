import './NavBar.css';
import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    // State to manage whether the dark mode is enabled
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage for saved theme preference, default to "light"
        return localStorage.getItem("theme") === "dark";
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
                <span className="circle"></span> {/* You can style this to look like a slider */}
            </label>
        </div>
    );
};

export default DarkModeToggle;
