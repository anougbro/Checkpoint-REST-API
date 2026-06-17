// React imports
import React from 'react';

// Import styles
import './Header.css';

/**
 * Header Component
 * Displays the application title and description
 */
const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-title-section">
          <h1 className="header-title">
            <span className="title-icon">👥</span>
            User Management System
          </h1>
          <p className="header-subtitle">
            A modern REST API application built with MERN Stack (MongoDB, Express, React, Node.js)
          </p>
        </div>
        
        <div className="header-status">
          <span className="status-badge">
            <span className="status-dot"></span>
            Backend: Running
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
