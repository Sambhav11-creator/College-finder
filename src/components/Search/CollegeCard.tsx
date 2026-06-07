import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MapPin, IndianRupee, Briefcase, Bookmark, GitCompare, Award, ArrowRight } from 'lucide-react';
import { type College } from '../../types';
import { useSaved } from '../../context/SavedContext';
import { RatingStars } from '../Common/RatingStars';

interface CollegeCardProps {
  college: College;
}

export const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  const { isSaved, toggleSaveCollege, isComparing, addToCompare, removeFromCompare, compareColleges } = useSaved();

  const saved = isSaved(college.id);
  const comparing = isComparing(college.id);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (comparing) {
      removeFromCompare(college.id);
    } else {
      const added = addToCompare(college.id);
      if (!added && compareColleges.length >= 3) {
        alert('You can only compare a maximum of 3 colleges at once.');
      }
    }
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveCollege(college.id);
  };

  const formatLPA = (val: number) => {
    return `${val} LPA`;
  };

  const formatFees = (val: number) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${val.toLocaleString()}`;
  };

  const getStreamBadgeClass = (stream: College['stream']) => {
    if (stream === 'Engineering') return 'badge-eng';
    if (stream === 'Medical') return 'badge-med';
    return 'badge-mgmt';
  };

  const primaryRank = college.rankings && college.rankings.length > 0 ? college.rankings[0] : null;

  return (
    <div className="cd-row glass-panel glass-panel-interactive">
      {/* College Logo / Image and Basic info */}
      <div className="cd-info-section">
        <div className="cd-logo-box">
          <span className="cd-logo-text">{college.logo}</span>
        </div>
        <div className="cd-main-info">
          <div className="cd-title-row">
            <RouterLink to={`/college/${college.id}`} className="cd-name-link">
              <h3>{college.name}</h3>
            </RouterLink>
            <button
              onClick={handleSaveToggle}
              className={`cd-bookmark-btn ${saved ? 'active' : ''}`}
              title={saved ? 'Remove Bookmark' : 'Bookmark College'}
            >
              <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="cd-meta-row">
            <span className="cd-location">
              <MapPin size={13} />
              {college.city}, {college.state}
            </span>
            <span className={`badge ${college.type === 'Government' ? 'badge-gov' : 'badge-private'}`}>
              {college.type}
            </span>
            <span className={`badge ${getStreamBadgeClass(college.stream)}`}>
              {college.stream}
            </span>
          </div>

          <div className="cd-rating-row">
            <RatingStars rating={college.rating} size={14} />
            <span className="cd-rating-score">{college.rating.toFixed(1)} / 5</span>
          </div>
        </div>
      </div>

      {/* Structured metrics grid - matches Collegedunia column layout */}
      <div className="cd-metrics-section">
        <div className="cd-metric-col">
          <span className="cd-metric-label">
            <IndianRupee size={12} />
            Annual Fees
          </span>
          <span className="cd-metric-value">{formatFees(college.fees)}</span>
          <span className="cd-metric-sub">
            {college.stream === 'Engineering' ? 'B.Tech' : college.stream === 'Medical' ? 'MBBS' : 'MBA'}
          </span>
        </div>

        <div className="cd-metric-col">
          <span className="cd-metric-label">
            <Briefcase size={12} />
            Average Package
          </span>
          <span className="cd-metric-value text-success">{formatLPA(college.averagePackage)}</span>
          <span className="cd-metric-sub">Highest: {formatLPA(college.highestPackage)}</span>
        </div>

        <div className="cd-metric-col">
          <span className="cd-metric-label">
            <Award size={12} />
            Rankings
          </span>
          {primaryRank ? (
            <>
              <span className="cd-metric-value">#{primaryRank.rank}</span>
              <span className="cd-metric-sub text-truncate" title={primaryRank.body}>
                {primaryRank.body.split(' ')[0]}
              </span>
            </>
          ) : (
            <>
              <span className="cd-metric-value">N/A</span>
              <span className="cd-metric-sub">NIRF Rank</span>
            </>
          )}
        </div>
      </div>

      {/* Action panel */}
      <div className="cd-actions-section">
        <button
          onClick={handleCompareToggle}
          className={`cd-compare-action-btn ${comparing ? 'active' : ''}`}
        >
          <GitCompare size={14} />
          <span>{comparing ? 'Comparing' : 'Compare'}</span>
        </button>

        <RouterLink to={`/college/${college.id}`} className="cd-apply-btn">
          <span>View Details</span>
          <ArrowRight size={14} />
        </RouterLink>
      </div>

      <style>{`
        .cd-row {
          display: flex;
          flex-direction: row;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          overflow: hidden;
          margin-bottom: 1.25rem;
          width: 100%;
        }
        
        @media (max-width: 992px) {
          .cd-row {
            flex-direction: column;
          }
        }

        /* Info Section styling */
        .cd-info-section {
          flex: 1.5;
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem;
          border-right: 1px solid var(--border-light);
        }
        
        @media (max-width: 992px) {
          .cd-info-section {
            border-right: none;
            border-bottom: 1px solid var(--border-light);
          }
        }

        .cd-logo-box {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.25), rgba(var(--color-secondary-rgb), 0.2));
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .cd-logo-text {
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--text-primary);
          letter-spacing: 0.5px;
        }
        
        .cd-main-info {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex-grow: 1;
        }
        
        .cd-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .cd-name-link h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
          transition: color 0.2s ease;
        }
        .cd-name-link h3:hover {
          color: var(--color-primary);
        }
        .cd-bookmark-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0.25rem;
        }
        .cd-bookmark-btn:hover {
          color: var(--text-primary);
          transform: scale(1.1);
        }
        .cd-bookmark-btn.active {
          color: var(--color-secondary);
        }

        .cd-meta-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem 0.75rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .cd-location {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--text-muted);
        }
        
        .cd-rating-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.2rem;
        }
        .cd-rating-score {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        /* Metrics grid styling */
        .cd-metrics-section {
          flex: 1.5;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.01);
          border-right: 1px solid var(--border-light);
        }
        
        @media (max-width: 992px) {
          .cd-metrics-section {
            border-right: none;
            border-bottom: 1px solid var(--border-light);
          }
        }
        @media (max-width: 480px) {
          .cd-metrics-section {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        .cd-metric-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 1rem;
          border-right: 1px solid rgba(255, 255, 255, 0.04);
        }
        .cd-metric-col:last-child {
          border-right: none;
        }
        @media (max-width: 480px) {
          .cd-metric-col {
            padding: 0;
            border-right: none;
          }
        }

        .cd-metric-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.35rem;
          font-weight: 500;
        }
        .cd-metric-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .cd-metric-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.1rem;
        }
        .text-truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        /* Actions styling */
        .cd-actions-section {
          flex: 0.8;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.75rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
        }
        
        @media (max-width: 992px) {
          .cd-actions-section {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .cd-compare-action-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cd-compare-action-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .cd-compare-action-btn.active {
          background: rgba(var(--color-primary-rgb), 0.1);
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        
        .cd-apply-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          background: var(--color-primary);
          color: white;
          padding: 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .cd-apply-btn:hover {
          background: var(--color-primary-hover);
          box-shadow: 0 4px 12px var(--color-primary-glow);
        }
      `}</style>
    </div>
  );
};
