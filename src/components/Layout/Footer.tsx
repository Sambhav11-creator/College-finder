import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-brand-column">
          <div className="footer-logo">
            <GraduationCap className="footer-logo-icon" size={24} />
            <span>CollegeFinder</span>
          </div>
          <p className="footer-desc">
            Empowering students to research, compare, and discover their perfect college pathway. 
            Find detailed insights on courses, fees, placements, and admission odds.
          </p>
        </div>

        <div className="footer-links-column">
          <h4>Features</h4>
          <Link to="/search" className="footer-link">Search Colleges</Link>
          <Link to="/predictor" className="footer-link">Rank Predictor</Link>
          <Link to="/compare" className="footer-link">Compare Tool</Link>
          <Link to="/saved" className="footer-link">Saved Items</Link>
        </div>

        <div className="footer-links-column">
          <h4>Exams Supported</h4>
          <span className="footer-tag">JEE Main</span>
          <span className="footer-tag">NEET MBBS</span>
          <span className="footer-tag">CAT MBA</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>&copy; {new Date().getFullYear()} CollegeFinder. All rights reserved.</p>
          <div className="footer-socials">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
            <a href="https://google.com" target="_blank" rel="noreferrer" className="social-icon-link">
              <Globe size={18} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-section {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-light);
          padding: 3rem 0 1.5rem 0;
          margin-top: auto;
        }
        .footer-container {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .footer-logo-icon {
          color: var(--color-primary);
        }
        .footer-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 400px;
        }
        .footer-links-column {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-links-column h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .footer-link {
          font-size: 0.9rem;
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: var(--color-primary);
        }
        .footer-tag {
          font-size: 0.85rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          width: fit-content;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding-top: 1.5rem;
        }
        .footer-bottom-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        @media (max-width: 640px) {
          .footer-bottom-container {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
        .footer-socials {
          display: flex;
          gap: 1rem;
        }
        .social-icon-link {
          color: var(--text-muted);
          transition: color 0.2s ease;
        }
        .social-icon-link:hover {
          color: var(--text-primary);
        }
      `}</style>
    </footer>
  );
};
