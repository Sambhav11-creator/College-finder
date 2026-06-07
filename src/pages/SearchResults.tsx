import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useColleges } from '../context/CollegeContext';
import { FilterSidebar } from '../components/Search/FilterSidebar';
import { CollegeCard } from '../components/Search/CollegeCard';
import { Search, SlidersHorizontal, Compass, GraduationCap } from 'lucide-react';
import { type College } from '../types';

export const SearchResults: React.FC = () => {
  const { triggerSearchApi, loading: dbLoading } = useColleges();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // URL parameters init
  const initialQuery = searchParams.get('q') || '';
  const initialStream = searchParams.get('stream') || '';

  // Local state
  const [query, setQuery] = useState(initialQuery);
  const [sorting, setSorting] = useState('rating');
  const [results, setResults] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    streams: initialStream ? [initialStream] : [] as string[],
    states: [] as string[],
    maxFees: 1500000,
    minRating: 0,
    ownershipTypes: [] as string[]
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Track initial load from search params change
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const st = searchParams.get('stream') || '';
    setQuery(q);
    setFilters((prev) => ({
      ...prev,
      streams: st ? [st] : prev.streams
    }));
  }, [searchParams]);

  // Trigger search API when query, filters, or sorting changes
  useEffect(() => {
    let active = true;
    
    const fetchResults = async () => {
      setLoading(true);
      const apiResults = await triggerSearchApi(query, filters, sorting);
      if (active) {
        setResults(apiResults);
        setLoading(false);
        setCurrentPage(1); // Reset page to 1
      }
    };

    fetchResults();

    return () => {
      active = false;
    };
  }, [query, filters, sorting]);

  const handleFilterChange = (updatedFilters: typeof filters) => {
    setFilters(updatedFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      streams: [],
      states: [],
      maxFees: 1500000,
      minRating: 0,
      ownershipTypes: []
    });
    setQuery('');
    setSearchParams({});
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Sync with URL query param silently without full reload
    if (e.target.value.trim()) {
      setSearchParams({ q: e.target.value.trim() }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  // Pagination computations
  const totalItems = results.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="search-page-container container">
      {/* Search Header Hero Bar */}
      <div className="search-header-panel glass-panel">
        <GraduationCap className="search-cap-icon" size={24} />
        <h2>Explore & Search Institutions</h2>
        <div className="header-search-box">
          <Search size={18} className="search-input-icon" />
          <input
            type="text"
            placeholder="Search by college name, city, stream..."
            value={query}
            onChange={handleSearchInputChange}
            className="search-input-field"
          />
        </div>
      </div>

      <div className="search-layout-grid">
        
        {/* Left Side: Sidebar Filters (Hidden on Mobile) */}
        <aside className={`search-sidebar-wrapper ${showMobileFilters ? 'mobile-visible' : ''}`}>
          <div className="mobile-close-bar">
            <button className="btn btn-secondary" onClick={() => setShowMobileFilters(false)}>
              Apply Filters
            </button>
          </div>
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
          />
        </aside>

        {/* Right Side: Search Results Column */}
        <main className="search-results-main">
          {/* Top toolbar */}
          <div className="results-toolbar glass-panel">
            <div className="results-count-text">
              <span>{totalItems} Colleges Found</span>
              {query && <span className="query-highlight"> for "{query}"</span>}
            </div>

            <div className="toolbar-actions">
              <button 
                className="mobile-filter-trigger" 
                onClick={() => setShowMobileFilters(true)}
              >
                <SlidersHorizontal size={16} />
                <span>Filters</span>
              </button>

              <div className="sort-box">
                <span className="sort-label">Sort By:</span>
                <select 
                  value={sorting}
                  onChange={(e) => setSorting(e.target.value)}
                  className="sort-dropdown"
                >
                  <option value="rating">Rating (Highest)</option>
                  <option value="fees_asc">Fees (Low to High)</option>
                  <option value="fees_desc">Fees (High to Low)</option>
                  <option value="package_desc">Average Package (High)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Listings list or loading loader */}
          <div className="listings-container">
            {loading || dbLoading ? (
              <div style={{ marginTop: '1rem' }}>
                {/* Custom card skeleton list */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="skeleton-row-loader glass-panel shimmer">
                    <div className="sk-col sk-1"></div>
                    <div className="sk-col sk-2"></div>
                    <div className="sk-col sk-3"></div>
                  </div>
                ))}
              </div>
            ) : currentItems.length === 0 ? (
              <div className="empty-results-box glass-panel">
                <Compass size={48} className="empty-compass" />
                <h3>No Colleges Match Your Filters</h3>
                <p>Try clearing your selected filters or searching for something else.</p>
                <button className="btn btn-primary" onClick={handleClearFilters} style={{ marginTop: '1rem' }}>
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="results-list animate-fade-in">
                  {currentItems.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="pagination-bar">
                    <button
                      className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      &laquo; Prev
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        className={`page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(idx + 1)}
                      >
                        {idx + 1}
                      </button>
                    ))}

                    <button
                      className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next &raquo;
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <style>{`
        .search-page-container {
          padding-top: 1.5rem;
        }
        
        .search-header-panel {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem 2rem;
          border-radius: var(--radius-lg);
          margin-bottom: 1.5rem;
          background: rgba(13, 19, 33, 0.6);
        }
        @media (max-width: 640px) {
          .search-header-panel {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
            padding: 1.25rem;
          }
        }
        
        .search-cap-icon {
          color: var(--color-primary);
          flex-shrink: 0;
        }
        .search-header-panel h2 {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          flex-grow: 1;
        }
        
        .header-search-box {
          position: relative;
          width: 320px;
        }
        @media (max-width: 640px) {
          .header-search-box { width: 100%; }
        }
        .search-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .search-input-field {
          width: 100%;
          padding: 0.6rem 1rem 0.6rem 2.25rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          color: white;
          outline: none;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        .search-input-field:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 10px var(--color-primary-glow);
        }
        
        .search-layout-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 1.5rem;
          align-items: flex-start;
        }
        @media (max-width: 992px) {
          .search-layout-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .search-sidebar-wrapper {
          position: sticky;
          top: calc(var(--header-height) + 1.5rem);
        }
        @media (max-width: 992px) {
          .search-sidebar-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 300px;
            background: var(--bg-secondary);
            border-right: 1px solid var(--border-light);
            z-index: 105;
            padding: 1.5rem;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            box-shadow: 10px 0 30px rgba(0,0,0,0.5);
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }
          .search-sidebar-wrapper.mobile-visible {
            transform: translateX(0);
          }
        }
        
        .mobile-close-bar {
          display: none;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 992px) {
          .mobile-close-bar { display: block; }
        }
        
        .results-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
        }
        
        .results-count-text {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .query-highlight {
          color: var(--color-primary);
        }
        
        .toolbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .mobile-filter-trigger {
          display: none;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }
        @media (max-width: 992px) {
          .mobile-filter-trigger { display: flex; }
        }
        
        .sort-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .sort-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .sort-dropdown {
          background: var(--bg-tertiary);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }
        
        /* Shimmer Row Loader */
        .skeleton-row-loader {
          height: 120px;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem;
          overflow: hidden;
        }
        .sk-col {
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.03);
        }
        .sk-1 { width: 40%; height: 100%; }
        .sk-2 { width: 35%; height: 100%; }
        .sk-3 { width: 25%; height: 100%; }
        
        .empty-results-box {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .empty-compass {
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .empty-results-box h3 {
          font-size: 1.25rem;
          font-weight: 700;
        }
        .empty-results-box p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        
        .pagination-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 2.5rem;
        }
        .page-btn {
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .page-btn:hover:not(.disabled) {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .page-btn.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
          box-shadow: 0 4px 10px var(--color-primary-glow);
        }
        .page-btn.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .page-btn:first-child, .page-btn:last-child {
          width: auto;
          padding: 0 0.75rem;
        }
      `}</style>
    </div>
  );
};
