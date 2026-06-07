import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSaved } from '../context/SavedContext';
import { useColleges } from '../context/CollegeContext';
import { CollegeCard } from '../components/Search/CollegeCard';
import { Bookmark, GitCompare, Trash2, ArrowRight } from 'lucide-react';

export const SavedItems: React.FC = () => {
  const navigate = useNavigate();
  const { savedColleges, savedComparisons, deleteSavedComparison, clearCompare, addToCompare } = useSaved();
  const { colleges } = useColleges();

  const bookmarkedColleges = colleges.filter((c) => savedColleges.includes(c.id));

  const loadSavedComparison = (ids: string[]) => {
    clearCompare();
    ids.forEach((id) => addToCompare(id));
    navigate('/compare');
  };

  return (
    <div className="saved-items-container container animate-fade-in">
      <div className="saved-items-header">
        <Bookmark size={24} className="saved-header-icon" />
        <h2>Your Saved Shortlists & Comparisons</h2>
        <p>Manage your bookmarked colleges and retrieve your saved comparison matchups.</p>
      </div>

      <div className="saved-layout">
        
        {/* Bookmarked Colleges Row */}
        <section className="saved-colleges-section">
          <h3>Saved Colleges ({bookmarkedColleges.length})</h3>
          
          {bookmarkedColleges.length === 0 ? (
            <div className="empty-saved-box glass-panel">
              <Bookmark size={36} className="empty-saved-icon" />
              <h4>No Bookmarks Yet</h4>
              <p>Explore colleges and click the bookmark icon to save institutions for quick access.</p>
              <button className="btn btn-primary" onClick={() => navigate('/search')} style={{ marginTop: '1rem' }}>
                Browse Colleges
              </button>
            </div>
          ) : (
            <div className="saved-colleges-list">
              {bookmarkedColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          )}
        </section>

        {/* Saved Comparisons Section */}
        <section className="saved-comparisons-sidebar-section">
          <h3>Saved Matchups ({savedComparisons.length})</h3>

          {savedComparisons.length === 0 ? (
            <div className="empty-saved-box glass-panel">
              <GitCompare size={36} className="empty-saved-icon" />
              <h4>No Saved Comparisons</h4>
              <p>Compare colleges on the comparison page and click "Save Comparison" to record matchups.</p>
              <button className="btn btn-secondary" onClick={() => navigate('/compare')} style={{ marginTop: '1rem' }}>
                Go to Compare
              </button>
            </div>
          ) : (
            <div className="saved-comps-list">
              {savedComparisons.map((comparisonIds, index) => {
                const compColleges = colleges.filter((c) => comparisonIds.includes(c.id));
                return (
                  <div key={index} className="saved-matchup-card glass-panel glass-panel-interactive">
                    <div className="matchup-header">
                      <div className="matchup-title-box">
                        <GitCompare size={14} className="matchup-title-icon" />
                        <span>Matchup #{index + 1}</span>
                      </div>
                      <button
                        className="matchup-delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSavedComparison(index);
                        }}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="matchup-colleges-row">
                      {compColleges.map((c) => (
                        <div key={c.id} className="matchup-college-badge">
                          <span className="badge-logo-i">{c.logo}</span>
                          <span className="badge-name-i">{c.shortName}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      className="btn-matchup-launch"
                      onClick={() => loadSavedComparison(comparisonIds)}
                    >
                      <span>Load Comparison</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>

      <style>{`
        .saved-items-container {
          padding-top: 1.5rem;
        }
        .saved-items-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .saved-header-icon {
          color: var(--color-primary);
        }
        .saved-items-header h2 {
          font-size: 1.6rem;
          font-weight: 800;
          color: white;
        }
        .saved-items-header p {
          width: 100%;
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-top: 0.1rem;
        }
        
        .saved-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 992px) {
          .saved-layout {
            grid-template-columns: 1fr;
          }
        }
        
        .saved-colleges-section h3, .saved-comparisons-sidebar-section h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: white;
          border-left: 3px solid var(--color-primary);
          padding-left: 0.6rem;
        }
        
        .saved-colleges-list {
          display: flex;
          flex-direction: column;
        }
        
        .empty-saved-box {
          padding: 3rem 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .empty-saved-icon {
          color: var(--text-muted);
        }
        .empty-saved-box h4 {
          font-size: 1.05rem;
          font-weight: 700;
        }
        .empty-saved-box p {
          font-size: 0.85rem;
          color: var(--text-muted);
          max-width: 320px;
        }
        
        .saved-comps-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .saved-matchup-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .matchup-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .matchup-title-box {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .matchup-title-icon {
          color: var(--color-primary);
        }
        .matchup-delete-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .matchup-delete-btn:hover {
          color: var(--color-danger);
        }
        
        .matchup-colleges-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .matchup-college-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-light);
          padding: 0.4rem 0.6rem;
          border-radius: var(--radius-sm);
        }
        .badge-logo-i {
          font-size: 0.7rem;
          font-weight: 800;
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-secondary);
          padding: 0.1rem 0.3rem;
          border-radius: 2px;
        }
        .badge-name-i {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        
        .btn-matchup-launch {
          width: 100%;
          background: rgba(var(--color-primary-rgb), 0.12);
          color: var(--color-primary);
          border: 1px solid rgba(var(--color-primary-rgb), 0.25);
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
        }
        .btn-matchup-launch:hover {
          background: var(--color-primary);
          color: white;
          box-shadow: 0 4px 10px var(--color-primary-glow);
        }
      `}</style>
    </div>
  );
};
