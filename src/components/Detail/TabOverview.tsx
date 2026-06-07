import React from 'react';
import { type College } from '../../types';
import { Calendar, Award, BookOpen, ShieldCheck } from 'lucide-react';

interface TabOverviewProps {
  college: College;
}

export const TabOverview: React.FC<TabOverviewProps> = ({ college }) => {
  return (
    <div className="overview-tab-container animate-fade-in">
      <div className="overview-layout">
        {/* Left Column - Detailed biography */}
        <div className="overview-main">
          <div className="overview-card glass-panel">
            <h3>About the Institution</h3>
            <p className="college-description">{college.description}</p>
            
            <div className="college-highlights-row">
              <div className="highlight-item">
                <Calendar className="highlight-icon" />
                <div>
                  <span className="highlight-label">Established</span>
                  <span className="highlight-value">{college.established}</span>
                </div>
              </div>
              <div className="highlight-item">
                <ShieldCheck className="highlight-icon" />
                <div>
                  <span className="highlight-label">Type</span>
                  <span className="highlight-value">{college.type} Institute</span>
                </div>
              </div>
              <div className="highlight-item">
                <BookOpen className="highlight-icon" />
                <div>
                  <span className="highlight-label">Main Stream</span>
                  <span className="highlight-value">{college.stream}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overview-card glass-panel" style={{ marginTop: '1.5rem' }}>
            <h3>Campus Facilities</h3>
            <div className="facilities-grid">
              {college.facilities.map((fac) => (
                <div key={fac} className="facility-tag">
                  <span className="facility-bullet">&bull;</span>
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Rankings and quick stats */}
        <div className="overview-sidebar">
          <div className="overview-card glass-panel rankings-card">
            <div className="card-header-with-icon">
              <Award className="ranking-header-icon" />
              <h3>Accreditation & Rankings</h3>
            </div>
            <div className="rankings-list">
              {college.rankings.map((rank, idx) => (
                <div key={idx} className="ranking-list-item">
                  <div className="rank-badge">#{rank.rank}</div>
                  <div className="rank-source">{rank.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .overview-tab-container {
          width: 100%;
        }
        .overview-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .overview-layout {
            grid-template-columns: 1fr;
          }
        }
        .overview-card {
          padding: 1.75rem;
          border-radius: var(--radius-md);
        }
        .overview-card h3 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
          border-left: 3px solid var(--color-primary);
          padding-left: 0.6rem;
        }
        .college-description {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }
        .college-highlights-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          border-top: 1px solid var(--border-light);
          padding-top: 1.25rem;
        }
        @media (max-width: 480px) {
          .college-highlights-row {
            grid-template-columns: 1fr;
          }
        }
        .highlight-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .highlight-icon {
          color: var(--color-primary);
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }
        .highlight-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .highlight-value {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .facilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.75rem;
        }
        .facility-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-light);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .facility-bullet {
          color: var(--color-primary);
          font-size: 1.25rem;
        }
        .card-header-with-icon {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .ranking-header-icon {
          color: var(--color-warning);
        }
        .rankings-card h3 {
          border-left: none;
          padding-left: 0;
          margin-bottom: 0;
        }
        .rankings-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .ranking-list-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-light);
          padding: 0.75rem;
          border-radius: var(--radius-md);
        }
        .rank-badge {
          background: rgba(var(--color-secondary-rgb), 0.15);
          color: var(--color-warning);
          font-weight: 800;
          font-size: 0.9rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(var(--color-secondary-rgb), 0.3);
        }
        .rank-source {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          line-height: 1.3;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.35s ease forwards;
        }
      `}</style>
    </div>
  );
};
