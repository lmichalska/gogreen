// Lidia

import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [showButton, setShowButton] = useState(false);
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>MyGarden</h4>
          <p>Your all-in-one plant companion! Track care, diagnose plants, and connect with fellow gardeners.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 MyGarden App. All rights reserved.</p>
      </div>
      {showButton && (
        <button onClick={scrollToTop} className="go-to-top">
          ⬆ Go to Top
        </button>
      )}
    </footer>
  );
};

export default Footer;