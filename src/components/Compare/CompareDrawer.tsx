import React from 'react';
import { Link } from 'react-router-dom';
import { X, GitCompare, Trash2 } from 'lucide-react';
import { useSaved } from '../../context/SavedContext';
import { useColleges } from '../../context/CollegeContext';

export const CompareDrawer: React.FC = () => {
  const { compareColleges, removeFromCompare, clearCompare } = useSaved();
  const { colleges } = useColleges();

  if (compareColleges.length === 0) return null;

  const selectedColleges = colleges.filter((c) => compareColleges.includes(c.id));

  return (
    <div className="compare-drawer-fixed glass-panel animate-slide-up">
      <div className="container drawer-container">
        <div className="drawer-info">
          <div className="drawer-icon-box">
            <GitCompare size={20} className="pulse-icon" />
          </div>
          <div>
            <h4>Compare Colleges</h4>
            <p>{compareColleges.length} of 3 selected</p>
          </div>
        </div>

        <div className="drawer-items">
          {selectedColleges.map((college) => (
            <div key={college.id} className="drawer-item-chip">
              <span className="chip-logo">{college.logo}</span>
              <span className="chip-name">{college.shortName}</span>
              <button
                className="chip-remove"
                onClick={() => removeFromCompare(college.id)}
                title="Remove"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {Array.from({ length: 3 - compareColleges.length }).map((_, i) => (
            <div key={`empty-${i}`} className="drawer-item-chip empty-chip">
              <span className="chip-placeholder">+ Add College</span>
            </div>
          ))}
        </div>

        <div className="drawer-actions">
          <button className="btn-clear-all" onClick={clearCompare} title="Clear All">
            <Trash2 size={16} />
            <span>Clear</span>
          </button>
          
          <Link
            to="/compare"
            className={`btn-compare-action ${compareColleges.length < 2 ? 'disabled' : ''}`}
            onClick={(e) => compareColleges.length < 2 && e.preventDefault()}
          >
            <span>Compare Now</span>
            <GitCompare size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .compare-drawer-fixed {
          position: fixed;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          z-index: 90;
          background: rgba(10, 13, 20, 0.85);
          border: 1px solid rgba(var(--color-primary-rgb), 0.25);
          border-radius: var(--radius-lg);
          padding: 1rem 0;
          box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5), var(--shadow-glow);
        }
        
        .drawer-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .drawer-container {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
        }

        .drawer-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .drawer-icon-box {
          width: 40px;
          height: 40px;
          background: rgba(var(--color-primary-rgb), 0.15);
          border: 1px solid rgba(var(--color-primary-rgb), 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
        }
        .pulse-icon {
          animation: pulse 2s infinite;
        }
        .drawer-info h4 {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 0.1rem;
        }
        .drawer-info p {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .drawer-items {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-grow: 1;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .drawer-items {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
          }
        }

        .drawer-item-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-light);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          min-width: 150px;
        }
        .chip-logo {
          font-size: 0.7rem;
          font-weight: 800;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          color: var(--text-secondary);
        }
        .chip-name {
          font-weight: 600;
          flex-grow: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100px;
        }
        .chip-remove {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
        }
        .chip-remove:hover {
          color: var(--color-danger);
        }

        .empty-chip {
          background: rgba(255, 255, 255, 0.01);
          border-style: dashed;
          border-color: rgba(255, 255, 255, 0.1);
          justify-content: center;
        }
        .chip-placeholder {
          color: var(--text-muted);
          font-size: 0.8rem;
          font-weight: 500;
        }

        .drawer-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        @media (max-width: 768px) {
          .drawer-actions {
            justify-content: flex-end;
          }
        }

        .btn-clear-all {
          background: transparent;
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: var(--text-muted);
          padding: 0.6rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.2s ease;
        }
        .btn-clear-all:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #fca5a5;
          border-color: rgba(239, 68, 68, 0.4);
        }

        .btn-compare-action {
          background: var(--color-primary);
          color: white;
          padding: 0.6rem 1.25rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px var(--color-primary-glow);
        }
        .btn-compare-action:hover:not(.disabled) {
          background: var(--color-primary-hover);
          transform: translateY(-1px);
        }
        .btn-compare-action.disabled {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          border: 1px solid var(--border-light);
          box-shadow: none;
          cursor: not-allowed;
          opacity: 0.6;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.4); }
          100% { transform: scale(1); }
        }

        @keyframes slide-up {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
