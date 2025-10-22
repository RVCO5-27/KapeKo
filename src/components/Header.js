import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleBrandClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" aria-label="Main navigation">
      <div className="container">
          <button 
            className="navbar-brand fw-bold btn btn-link text-decoration-none interactive d-flex align-items-center" 
            onClick={handleBrandClick}
            style={{color: 'white', border: 'none', background: 'none', padding: '0.5rem'}}
          >
            <i className="fas fa-coffee me-2" style={{color: '#FFC107', fontSize: '1.2em', minWidth: '20px'}}></i>
            <span style={{color: 'white', fontWeight: 'bold'}}>Kapeko Coffee</span>
            {/* Fallback emoji in case Font Awesome doesn't load */}
            <span style={{display: 'none'}} className="fallback-emoji">☕</span>
          </button>
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          style={{boxShadow: 'none'}}
        >
          <span className={`navbar-toggler-icon ${isMenuOpen ? 'active' : ''}`}></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-end ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                to="/"
                onClick={handleNavClick}
              >
                <i className="fas fa-home me-2"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/about') ? 'active' : ''}`} 
                to="/about"
                onClick={handleNavClick}
              >
                <i className="fas fa-info-circle me-2"></i>About
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/menu') ? 'active' : ''}`} 
                to="/menu"
                onClick={handleNavClick}
              >
                <i className="fas fa-coffee me-2"></i>Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/order') ? 'active' : ''}`} 
                to="/order"
                onClick={handleNavClick}
              >
                <i className="fas fa-shopping-cart me-2"></i>Order
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`} 
                to="/contact"
                onClick={handleNavClick}
              >
                <i className="fas fa-envelope me-2"></i>Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/feedback') ? 'active' : ''}`} 
                to="/feedback"
                onClick={handleNavClick}
              >
                <i className="fas fa-star me-2"></i>Feedback
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
