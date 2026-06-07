import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSaved } from '../context/SavedContext';
import { useColleges } from '../context/CollegeContext';
import { RatingStars } from '../components/Common/RatingStars';
import { GitCompare, Plus, Trash2, Calendar, MapPin, Check } from 'lucide-react';


export const ComparePage: React.FC = () => {
  const navigate = useNavigate();
  const { compareColleges, addToCompare, removeFromCompare, clearCompare, saveComparison, savedComparisons, deleteSavedComparison } = useSaved();
  const { colleges } = useColleges();
  const [dropdownActiveIndex, setDropdownActiveIndex] = useState<number | null>(null);

  const selectedColleges = colleges.filter((c) => compareColleges.includes(c.id));

  // Determine best indicators for highlighting
  const getLowestFeesId = () => {
    if (selectedColleges.length < 2) return null;
    let minFee = Infinity;
    let bestId = '';
    selectedColleges.forEach((c) => {
      if (c.fees < minFee) {
        minFee = c.fees;
        bestId = c.id;
      }
    });
    return bestId;
  };

  const getHighestPlacementId = () => {
    if (selectedColleges.length < 2) return null;
    let maxPl = -1;
    let bestId = '';
    selectedColleges.forEach((c) => {
      if (c.averagePackage > maxPl) {
        maxPl = c.averagePackage;
        bestId = c.id;
      }
    });
    return bestId;
  };

  const getHighestRatingId = () => {
    if (selectedColleges.length < 2) return null;
    let maxRat = -1;
    let bestId = '';
    selectedColleges.forEach((c) => {
      if (c.rating > maxRat) {
        maxRat = c.rating;
        bestId = c.id;
      }
    });
    return bestId;
  };

  const lowestFeesId = getLowestFeesId();
  const highestPlId = getHighestPlacementId();
  const highestRatingId = getHighestRatingId();

  const handleAddFromDropdown = (id: string) => {
    addToCompare(id);
    setDropdownActiveIndex(null);
  };

  const handleSaveCompClick = () => {
    if (compareColleges.length >= 2) {
      saveComparison(compareColleges);
      alert('Comparison saved successfully! Access it from Saved Items page.');
    }
  };

  const loadSavedComparison = (ids: string[]) => {
    clearCompare();
    ids.forEach((id) => addToCompare(id));
  };

  const formatLPA = (val: number) => `₹${val} LPA`;
  const formatFees = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs/Yr`;
    return `₹${val.toLocaleString()}/Yr`;
  };

  return (
    <div className="compare-page-container container animate-fade-in">
      <div className="compare-header-row">
        <div>
          <h2>Compare Colleges Side-by-Side</h2>
          <p>Compare colleges on fees, average packages, ratings, and facilities to make an informed decision.</p>
        </div>
        {selectedColleges.length >= 2 && (
          <div className="compare-action-btns">
            <button className="btn btn-secondary" onClick={handleSaveCompClick}>
              Save Comparison
            </button>
            <button className="btn btn-outline" onClick={clearCompare} style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#fca5a5' }}>
              Clear All
            </button>
          </div>
        )}
      </div>

      {selectedColleges.length === 0 ? (
        // Empty State: Direct selection panel
        <div className="compare-empty-state glass-panel">
          <GitCompare size={48} className="compare-empty-icon" />
          <h3>No Colleges Selected for Comparison</h3>
          <p>Add 2 or 3 colleges to see their side-by-side comparison matrix.</p>
          
          <div className="quick-selection-row" style={{ marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={() => navigate('/search')}>
              Explore College List
            </button>
          </div>
        </div>
      ) : (
        // Comparison Matrix Table
        <div className="matrix-wrapper glass-panel">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-label-col">Metrics & Features</th>
                {/* 3 possible columns */}
                {[0, 1, 2].map((index) => {
                  const college = selectedColleges[index];
                  return (
                    <th key={index} className="college-header-col">
                      {college ? (
                        <div className="matrix-header-box">
                          <button
                            className="remove-from-comp-btn"
                            onClick={() => removeFromCompare(college.id)}
                            title="Remove"
                          >
                            <Trash2 size={14} />
                          </button>
                          <div className="col-logo-circ">{college.logo}</div>
                          <h4>{college.shortName}</h4>
                          <span className="col-loc-sub">{college.city}</span>
                        </div>
                      ) : (
                        <div className="matrix-add-slot">
                          <button
                            className="add-slot-btn"
                            onClick={() => setDropdownActiveIndex(index)}
                          >
                            <Plus size={20} />
                            <span>Add College</span>
                          </button>
                          
                          {dropdownActiveIndex === index && (
                            <div className="dropdown-colleges-list glass-panel">
                              <div className="dropdown-header">Select College</div>
                              <div className="dropdown-scroll-items">
                                {colleges
                                  .filter((c) => !compareColleges.includes(c.id))
                                  .map((c) => (
                                    <button
                                      key={c.id}
                                      className="dropdown-item-btn"
                                      onClick={() => handleAddFromDropdown(c.id)}
                                    >
                                      <span>{c.shortName}</span>
                                      <span className="dropdown-item-stream">{c.stream}</span>
                                    </button>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {/* Ownership */}
              <tr>
                <td className="feature-label-cell">Ownership</td>
                {[0, 1, 2].map((i) => (
                  <td key={i}>
                    {selectedColleges[i] ? (
                      <span className={`badge ${selectedColleges[i].type === 'Government' ? 'badge-gov' : 'badge-private'}`}>
                        {selectedColleges[i].type}
                      </span>
                    ) : '-'}
                  </td>
                ))}
              </tr>

              {/* Stream */}
              <tr>
                <td className="feature-label-cell">Stream</td>
                {[0, 1, 2].map((i) => (
                  <td key={i}>
                    {selectedColleges[i] ? (
                      <span className="badge badge-mgmt" style={{ background: 'rgba(95, 93, 236, 0.08)', color: '#c7d2fe', borderColor: 'rgba(95, 93, 236, 0.15)' }}>
                        {selectedColleges[i].stream}
                      </span>
                    ) : '-'}
                  </td>
                ))}
              </tr>

              {/* Established */}
              <tr>
                <td className="feature-label-cell">Established Year</td>
                {[0, 1, 2].map((i) => (
                  <td key={i}>
                    {selectedColleges[i] ? (
                      <div className="flex-center-gap">
                        <Calendar size={14} className="text-muted" />
                        <span>{selectedColleges[i].established}</span>
                      </div>
                    ) : '-'}
                  </td>
                ))}
              </tr>

              {/* Location */}
              <tr>
                <td className="feature-label-cell">Location</td>
                {[0, 1, 2].map((i) => (
                  <td key={i}>
                    {selectedColleges[i] ? (
                      <div className="flex-center-gap">
                        <MapPin size={14} className="text-muted" />
                        <span>{selectedColleges[i].location}</span>
                      </div>
                    ) : '-'}
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr>
                <td className="feature-label-cell">User Rating</td>
                {[0, 1, 2].map((i) => {
                  const c = selectedColleges[i];
                  if (!c) return <td key={i}>-</td>;
                  const isBest = c.id === highestRatingId;
                  return (
                    <td key={i} className={isBest ? 'highlight-green-cell' : ''}>
                      <div className="matrix-rating-cell">
                        <RatingStars rating={c.rating} size={14} />
                        <span className="rating-value-bold">{c.rating.toFixed(1)} / 5</span>
                        {isBest && <span className="highlight-tag">Best Rating</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Fees */}
              <tr>
                <td className="feature-label-cell">Annual Fees</td>
                {[0, 1, 2].map((i) => {
                  const c = selectedColleges[i];
                  if (!c) return <td key={i}>-</td>;
                  const isBest = c.id === lowestFeesId;
                  return (
                    <td key={i} className={isBest ? 'highlight-green-cell' : ''}>
                      <span className="matrix-fee-value">{formatFees(c.fees)}</span>
                      {isBest && <span className="highlight-tag success-tag">Most Budget-Friendly</span>}
                    </td>
                  );
                })}
              </tr>

              {/* Average Placement */}
              <tr>
                <td className="feature-label-cell">Average Placement Package</td>
                {[0, 1, 2].map((i) => {
                  const c = selectedColleges[i];
                  if (!c) return <td key={i}>-</td>;
                  const isBest = c.id === highestPlId;
                  return (
                    <td key={i} className={isBest ? 'highlight-green-cell' : ''}>
                      <span className="matrix-pkg-value text-success">{formatLPA(c.averagePackage)}</span>
                      {isBest && <span className="highlight-tag success-tag">Best Avg Placement</span>}
                    </td>
                  );
                })}
              </tr>

              {/* Highest Placement */}
              <tr>
                <td className="feature-label-cell">Highest Package Offered</td>
                {[0, 1, 2].map((i) => (
                  <td key={i}>
                    {selectedColleges[i] ? (
                      <span className="matrix-pkg-value text-secondary">{formatLPA(selectedColleges[i].highestPackage)}</span>
                    ) : '-'}
                  </td>
                ))}
              </tr>

              {/* Facilities */}
              <tr>
                <td className="feature-label-cell">Facilities</td>
                {[0, 1, 2].map((i) => {
                  const col = selectedColleges[i];
                  if (!col) return <td key={i}>-</td>;
                  return (
                    <td key={i} className="facilities-matrix-cell">
                      <div className="facilities-matrix-tags">
                        {col.facilities.slice(0, 5).map((fac) => (
                          <div key={fac} className="matrix-fac-item">
                            <Check size={12} className="fac-check" />
                            <span>{fac}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Top Courses */}
              <tr>
                <td className="feature-label-cell">Top Courses Offered</td>
                {[0, 1, 2].map((i) => {
                  const col = selectedColleges[i];
                  if (!col) return <td key={i}>-</td>;
                  return (
                    <td key={i} className="courses-matrix-cell">
                      <div className="courses-matrix-list">
                        {col.topCourses.slice(0, 3).map((c, idx) => (
                          <div key={idx} className="matrix-course-item">
                            <span className="course-bullet">&bull;</span>
                            <span>{c.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  );
                })}
              </tr>

            </tbody>
          </table>
        </div>
      )}

      {/* Saved Comparisons Section */}
      {savedComparisons.length > 0 && (
        <section className="saved-comparisons-section" style={{ marginTop: '3rem' }}>
          <h3>Your Saved Comparisons</h3>
          <div className="saved-comparisons-grid">
            {savedComparisons.map((comparisonIds, index) => {
              const compColleges = colleges.filter((c) => comparisonIds.includes(c.id));
              return (
                <div key={index} className="saved-comp-card glass-panel">
                  <div className="saved-comp-header">
                    <h4>Comparison Matchup</h4>
                    <button
                      className="saved-comp-delete-btn"
                      onClick={() => deleteSavedComparison(index)}
                      title="Delete saved comparison"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="saved-comp-chips">
                    {compColleges.map((c) => (
                      <span key={c.id} className="comp-chip-v">
                        {c.shortName}
                      </span>
                    ))}
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={() => loadSavedComparison(comparisonIds)}>
                    Load Comparison
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <style>{`
        .compare-page-container {
          padding-top: 1.5rem;
        }
        
        .compare-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .compare-header-row {
            flex-direction: column;
            align-items: stretch;
          }
        }
        
        .compare-header-row h2 {
          font-size: 1.6rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.25rem;
        }
        .compare-header-row p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        
        .compare-action-btns {
          display: flex;
          gap: 0.75rem;
        }
        
        .compare-empty-state {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .compare-empty-icon {
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .compare-empty-state h3 {
          font-size: 1.25rem;
          font-weight: 700;
        }
        .compare-empty-state p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        
        .matrix-wrapper {
          overflow-x: auto;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
        }
        
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
          table-layout: fixed;
          min-width: 800px;
        }
        
        .comparison-table th, .comparison-table td {
          padding: 1.25rem;
          border-bottom: 1px solid var(--border-light);
          vertical-align: top;
          color: var(--text-secondary);
        }
        
        .feature-label-col, .feature-label-cell {
          width: 220px;
          font-weight: 700;
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.01);
          border-right: 1px solid var(--border-light);
        }
        
        .college-header-col {
          width: 250px;
          background: rgba(255, 255, 255, 0.02);
          border-right: 1px solid rgba(255, 255, 255, 0.03);
          position: relative;
        }
        
        .matrix-header-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
          position: relative;
          padding-top: 1rem;
        }
        
        .remove-from-comp-btn {
          position: absolute;
          top: -5px;
          right: -5px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #fca5a5;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .remove-from-comp-btn:hover {
          background: var(--color-danger);
          color: white;
        }
        
        .col-logo-circ {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1rem;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .matrix-header-box h4 {
          font-size: 1rem;
          font-weight: 700;
          color: white;
          line-height: 1.3;
        }
        
        .col-loc-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        
        .matrix-add-slot {
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .add-slot-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.15);
          color: var(--text-muted);
          width: 100%;
          height: 80px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .add-slot-btn:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          background: rgba(var(--color-primary-rgb), 0.05);
        }
        
        .dropdown-colleges-list {
          position: absolute;
          top: 100px;
          left: 0;
          right: 0;
          z-index: 10;
          max-height: 200px;
          overflow-y: auto;
          padding: 0.5rem;
          background: var(--bg-tertiary);
          border-color: rgba(var(--color-primary-rgb), 0.3);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }
        .dropdown-header {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          padding: 0.25rem;
          font-weight: 700;
        }
        .dropdown-scroll-items {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .dropdown-item-btn {
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.15s ease;
        }
        .dropdown-item-btn:hover {
          background: rgba(var(--color-primary-rgb), 0.1);
          color: white;
        }
        .dropdown-item-stream {
          font-size: 0.7rem;
          color: var(--text-muted);
        }
        
        .flex-center-gap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .highlight-green-cell {
          background: rgba(var(--color-success-rgb), 0.04);
        }
        
        .matrix-rating-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .rating-value-bold {
          font-weight: 700;
          color: var(--text-primary);
        }
        .highlight-tag {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(var(--color-secondary-rgb), 0.15);
          color: var(--color-warning);
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          width: fit-content;
          border: 1px solid rgba(var(--color-secondary-rgb), 0.25);
        }
        .highlight-tag.success-tag {
          background: rgba(var(--color-success-rgb), 0.15);
          color: var(--color-success);
          border-color: rgba(var(--color-success-rgb), 0.25);
        }
        
        .matrix-fee-value, .matrix-pkg-value {
          font-weight: 700;
          font-size: 1rem;
        }
        
        .facilities-matrix-cell {
          max-height: 200px;
          overflow-y: auto;
        }
        .facilities-matrix-tags {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .matrix-fac-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
        }
        .fac-check {
          color: var(--color-success);
          flex-shrink: 0;
        }
        
        .courses-matrix-cell {
          max-height: 200px;
        }
        .courses-matrix-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .matrix-course-item {
          display: flex;
          align-items: flex-start;
          gap: 0.35rem;
          font-size: 0.8rem;
          line-height: 1.4;
        }
        .course-bullet {
          color: var(--color-primary);
        }
        
        .saved-comparisons-section h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: white;
        }
        
        .saved-comparisons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .saved-comp-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .saved-comp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .saved-comp-header h4 {
          font-size: 0.95rem;
          font-weight: 700;
        }
        .saved-comp-delete-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .saved-comp-delete-btn:hover {
          color: var(--color-danger);
        }
        .saved-comp-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .comp-chip-v {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};
