import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    streams: string[];
    states: string[];
    maxFees: number;
    minRating: number;
    ownershipTypes: string[];
  };
  onChange: (filters: any) => void;
  onClear: () => void;
}

const STREAM_OPTIONS = ['Engineering', 'Medical', 'Management'];
const STATE_OPTIONS = ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'Jharkhand', 'Uttar Pradesh', 'West Bengal', 'Haryana', 'Puducherry'];
const OWNERSHIP_OPTIONS = ['Government', 'Private'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onChange, onClear }) => {
  
  const handleCheckboxChange = (field: 'streams' | 'states' | 'ownershipTypes', value: string) => {
    const list = [...filters[field]];
    const updatedList = list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];
    
    onChange({
      ...filters,
      [field]: updatedList
    });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...filters,
      maxFees: parseInt(e.target.value)
    });
  };

  const handleRatingChange = (rating: number) => {
    onChange({
      ...filters,
      minRating: filters.minRating === rating ? 0 : rating // toggle
    });
  };

  const formatFees = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)} L/Yr`;
    }
    return `₹${value.toLocaleString()}/Yr`;
  };

  return (
    <div className="filter-sidebar glass-panel">
      <div className="filter-header">
        <div className="filter-title">
          <Filter size={18} />
          <h3>Filters</h3>
        </div>
        <button className="clear-btn" onClick={onClear}>
          <RotateCcw size={14} />
          Clear
        </button>
      </div>

      <div className="filter-section-divider"></div>

      {/* Stream Selector */}
      <div className="filter-group">
        <h4>Stream / Domain</h4>
        <div className="checkbox-list">
          {STREAM_OPTIONS.map((stream) => (
            <label key={stream} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.streams.includes(stream)}
                onChange={() => handleCheckboxChange('streams', stream)}
              />
              <span>{stream}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section-divider"></div>

      {/* Fees Range Slider */}
      <div className="filter-group">
        <div className="flex-between">
          <h4>Max Annual Fees</h4>
          <span className="fee-value-display">{formatFees(filters.maxFees)}</span>
        </div>
        <input
          type="range"
          min="1500"
          max="1500000"
          step="5000"
          value={filters.maxFees}
          onChange={handleSliderChange}
          className="fee-slider"
        />
        <div className="flex-between slider-labels">
          <span>₹1.5k</span>
          <span>₹15L</span>
        </div>
      </div>

      <div className="filter-section-divider"></div>

      {/* State Location Selector */}
      <div className="filter-group">
        <h4>Location State</h4>
        <div className="checkbox-list scrollable-list">
          {STATE_OPTIONS.map((state) => (
            <label key={state} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.states.includes(state)}
                onChange={() => handleCheckboxChange('states', state)}
              />
              <span>{state}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section-divider"></div>

      {/* Ownership Type */}
      <div className="filter-group">
        <h4>Ownership</h4>
        <div className="checkbox-list">
          {OWNERSHIP_OPTIONS.map((type) => (
            <label key={type} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.ownershipTypes.includes(type)}
                onChange={() => handleCheckboxChange('ownershipTypes', type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section-divider"></div>

      {/* Minimum Rating */}
      <div className="filter-group">
        <h4>Minimum Rating</h4>
        <div className="rating-selector-buttons">
          {[4.5, 4.0, 3.5, 3.0].map((star) => (
            <button
              key={star}
              className={`rating-btn ${filters.minRating === star ? 'selected' : ''}`}
              onClick={() => handleRatingChange(star)}
            >
              <span>{star}★ & Above</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .filter-sidebar {
          padding: 1.5rem;
          height: fit-content;
          position: sticky;
          top: calc(var(--header-height) + 1.5rem);
        }
        .filter-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .filter-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .filter-title h3 {
          font-size: 1.1rem;
          font-weight: 700;
        }
        .clear-btn {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .clear-btn:hover {
          color: var(--color-secondary);
        }
        .filter-section-divider {
          height: 1px;
          background: var(--border-light);
          margin: 1.25rem 0;
        }
        .filter-group h4 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }
        .checkbox-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .scrollable-list {
          max-height: 150px;
          overflow-y: auto;
          padding-right: 0.25rem;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          cursor: pointer;
          user-select: none;
        }
        .checkbox-label input {
          width: 16px;
          height: 16px;
          accent-color: var(--color-primary);
          cursor: pointer;
        }
        .flex-between {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .fee-value-display {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        .fee-slider {
          width: 100%;
          margin: 0.75rem 0 0.25rem 0;
          accent-color: var(--color-primary);
          cursor: pointer;
        }
        .slider-labels {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .rating-selector-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }
        .rating-btn {
          padding: 0.4rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .rating-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .rating-btn.selected {
          background: rgba(var(--color-primary-rgb), 0.15);
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
      `}</style>
    </div>
  );
};
