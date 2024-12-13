import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBookOpen, FaGamepad, FaSearch} from 'react-icons/fa'; // You can use icons from react-icons
import './NavBar.css';

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <ul className="nav-links">
      <li>
          <Link to="/read" aria-label="Read">
            <FaBookOpen />
          </Link>
        </li>
        <li>
          <Link to="/" aria-label="Home">
            <FaHome />
          </Link>
        </li>
        <li>
          <Link to="/game" aria-label="Game">
            <FaGamepad />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BottomNav;
