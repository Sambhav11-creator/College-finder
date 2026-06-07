import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, GitCompare, Bookmark, User, Menu, X, GraduationCap } from 'lucide-react';
import { useSaved } from '../../context/SavedContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const { compareColleges, savedColleges } = useSaved();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('cf_auth') === 'true';
  });

  const toggleAuth = () => {
    const nextState = !isLoggedIn;
    setIsLoggedIn(nextState);
    localStorage.setItem('cf_auth', nextState ? 'true' : 'false');
  };

  const isActive = (path: string) => {
    if (path === '/search') {
      return location.pathname === '/search' || location.pathname.startsWith('/college/');
    }
    return location.pathname === path;
  };

  return (
    <header className="header-nav">
      <div className="container header-container">
        <Link to="/" className="logo-brand" onClick={() => setMobileMenuOpen(false)}>
          <GraduationCap className="logo-icon" size={28} />
          <span>College<span className="text-gradient">Finder</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-menu">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/search" className={`nav-link ${isActive('/search') ? 'active' : ''}`}>
            <Compass size={18} />
            Explore Colleges
          </Link>
          <Link to="/predictor" className={`nav-link ${isActive('/predictor') ? 'active' : ''}`}>
            Predictor Tool
          </Link>
          <Link to="/saved" className={`nav-link ${isActive('/saved') ? 'active' : ''}`}>
            <Bookmark size={18} />
            Saved {savedColleges.length > 0 && <span className="nav-badge">{savedColleges.length}</span>}
          </Link>
        </nav>

        <div className="header-actions">
          {compareColleges.length > 0 && (
            <Link to="/compare" className="compare-trigger-btn">
              <GitCompare size={18} />
              <span>Compare</span>
              <span className="compare-count">{compareColleges.length}</span>
            </Link>
          )}

          <button onClick={toggleAuth} className={`auth-btn ${isLoggedIn ? 'logged-in' : ''}`}>
            <User size={18} />
            <span>{isLoggedIn ? 'Hi, Student' : 'Login'}</span>
          </button>

          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/search" className={`mobile-nav-link ${isActive('/search') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Explore Colleges
            </Link>
            <Link to="/predictor" className={`mobile-nav-link ${isActive('/predictor') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Predictor Tool
            </Link>
            <Link to="/saved" className={`mobile-nav-link ${isActive('/saved') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Saved Items ({savedColleges.length})
            </Link>
            {compareColleges.length > 0 && (
              <Link to="/compare" className="mobile-nav-link flex-align" onClick={() => setMobileMenuOpen(false)}>
                Compare Colleges ({compareColleges.length})
              </Link>
            )}
            <button
              onClick={() => {
                toggleAuth();
                setMobileMenuOpen(false);
              }}
              className="mobile-auth-btn"
            >
              {isLoggedIn ? 'Logout (Hi, Student)' : 'Login / Signup'}
            </button>
          </nav>
        </div>
      )}

      {/* Styling specific to header inside global index.css or added header styling in index.css */}
      <style>{`
        .header-nav {
          position: sticky;
          top: 0;
          height: var(--header-height);
          background: rgba(8, 12, 20, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-light);
          z-index: 100;
          display: flex;
          align-items: center;
        }
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .logo-icon {
          color: var(--color-primary);
        }
        .text-gradient {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .desktop-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .desktop-menu { display: none; }
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.2s ease;
          position: relative;
          padding: 0.25rem 0;
        }
        .nav-link:hover {
          color: var(--text-primary);
        }
        .nav-link.active {
          color: var(--color-primary);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-primary);
          border-radius: 99px;
        }
        .nav-badge {
          background: var(--color-secondary);
          color: white;
          font-size: 0.7rem;
          padding: 0.1rem 0.4rem;
          border-radius: 99px;
          font-weight: 700;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .compare-trigger-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(var(--color-primary-rgb), 0.15);
          color: var(--color-primary);
          border: 1px solid rgba(var(--color-primary-rgb), 0.3);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .compare-trigger-btn:hover {
          background: var(--color-primary);
          color: white;
          box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.3);
        }
        .compare-count {
          background: white;
          color: var(--color-primary);
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .auth-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .auth-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .auth-btn.logged-in {
          background: rgba(var(--color-success-rgb), 0.1);
          border-color: rgba(var(--color-success-rgb), 0.3);
          color: var(--color-success);
        }
        .mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .mobile-toggle { display: block; }
        }
        .mobile-menu {
          position: fixed;
          top: var(--header-height);
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--bg-primary);
          z-index: 99;
          padding: 2rem 1.5rem;
          border-top: 1px solid var(--border-light);
          animation: fadeIn 0.2s ease;
        }
        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .mobile-nav-link {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-light);
        }
        .mobile-nav-link.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-primary);
        }
        .flex-align {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .mobile-auth-btn {
          margin-top: 1rem;
          padding: 0.75rem;
          background: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};
