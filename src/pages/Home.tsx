import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, GitCompare, Calculator, Bookmark, GraduationCap, ChevronRight } from 'lucide-react';
import { useColleges } from '../context/CollegeContext';
import { RatingStars } from '../components/Common/RatingStars';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { colleges } = useColleges();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const handleStreamClick = (stream: string) => {
    navigate(`/search?stream=${encodeURIComponent(stream)}`);
  };

  // Get top 3 rated colleges for a featured section
  const featuredColleges = [...colleges]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="home-container-page">
      {/* Background Glows */}
      <div className="radial-glow"></div>
      <div className="radial-glow-secondary"></div>

      {/* Hero Search Section - Collegedunia style */}
      <section className="hero-search-section">
        <div className="container hero-content">
          <div className="hero-badge">
            <GraduationCap size={16} />
            <span>Over 15+ Premier Indian Institutions Seeded</span>
          </div>
          
          <h1>Find Your Dream <span className="text-gradient">College</span> & Career</h1>
          <p className="hero-subtext">Research courses, fees, placements, and check your admission chances instantly.</p>

          <form onSubmit={handleSearchSubmit} className="hero-search-form glass-panel">
            <Search className="search-bar-icon" size={20} />
            <input
              type="text"
              placeholder="Search colleges by name, stream, city, state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hero-search-input"
            />
            <button type="submit" className="btn btn-primary hero-search-btn">
              Search
            </button>
          </form>

          {/* Quick Stream Badges */}
          <div className="hero-streams-row">
            <button className="stream-badge-btn glass-panel" onClick={() => handleStreamClick('Engineering')}>
              <span className="badge-logo-c">⚙️</span>
              <span>Engineering (B.Tech)</span>
            </button>
            <button className="stream-badge-btn glass-panel" onClick={() => handleStreamClick('Management')}>
              <span className="badge-logo-c">💼</span>
              <span>Management (MBA)</span>
            </button>
            <button className="stream-badge-btn glass-panel" onClick={() => handleStreamClick('Medical')}>
              <span className="badge-logo-c">🩺</span>
              <span>Medical (MBBS)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tools Quick Grid */}
      <section className="tools-grid-section container">
        <h2 className="section-title">Decision Tools</h2>
        
        <div className="grid-cols-3">
          <div className="tool-card glass-panel glass-panel-interactive" onClick={() => navigate('/predictor')}>
            <div className="tool-card-icon predictor-color">
              <Calculator size={24} />
            </div>
            <h3>Admission Predictor</h3>
            <p>Enter your JEE, NEET, or CAT score to check your chances at top colleges based on cutoffs.</p>
            <span className="tool-link-action">
              Open Predictor <ChevronRight size={16} />
            </span>
          </div>

          <div className="tool-card glass-panel glass-panel-interactive" onClick={() => navigate('/compare')}>
            <div className="tool-card-icon compare-color">
              <GitCompare size={24} />
            </div>
            <h3>Compare Colleges</h3>
            <p>Compare fees, placements, ratings, rankings, and cutoffs side-by-side for up to 3 colleges.</p>
            <span className="tool-link-action">
              Compare Now <ChevronRight size={16} />
            </span>
          </div>

          <div className="tool-card glass-panel glass-panel-interactive" onClick={() => navigate('/saved')}>
            <div className="tool-card-icon bookmarks-color">
              <Bookmark size={24} />
            </div>
            <h3>Saved Lists</h3>
            <p>View bookmarked colleges, shortlists, and previously saved comparisons from your list.</p>
            <span className="tool-link-action">
              View Bookmarks <ChevronRight size={16} />
            </span>
          </div>
        </div>
      </section>

      {/* Featured Colleges Collections */}
      <section className="featured-colleges-section container">
        <div className="flex-between" style={{ marginBottom: '1.5rem', alignItems: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Top Ranked Institutions</h2>
          <button className="btn btn-secondary btn-view-all" onClick={() => navigate('/search')}>
            <span>Explore All</span>
            <Compass size={16} />
          </button>
        </div>

        <div className="grid-cols-3">
          {featuredColleges.map((college) => (
            <div 
              key={college.id} 
              className="featured-college-card glass-panel glass-panel-interactive"
              onClick={() => navigate(`/college/${college.id}`)}
            >
              <div className="feat-card-banner">
                <img src={college.bannerImage} alt={college.name} />
                <span className="feat-avg-pkg">{college.averagePackage} LPA Avg</span>
              </div>
              <div className="feat-card-body">
                <h3>{college.shortName}</h3>
                <p className="feat-location">{college.city}, {college.state}</p>
                <div className="feat-rating-row">
                  <RatingStars rating={college.rating} size={14} />
                  <span>{college.rating.toFixed(1)} Rating</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .home-container-page {
          position: relative;
        }
        
        .hero-search-section {
          padding: 6rem 0 4rem 0;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 800px;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(var(--color-primary-rgb), 0.1);
          border: 1px solid rgba(var(--color-primary-rgb), 0.2);
          padding: 0.4rem 1rem;
          border-radius: 99px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 1.5rem;
        }
        
        .hero-content h1 {
          font-size: 3.25rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        @media (max-width: 640px) {
          .hero-content h1 { font-size: 2.25rem; }
        }
        
        .hero-subtext {
          font-size: 1.15rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          max-width: 600px;
        }
        
        .hero-search-form {
          display: flex;
          align-items: center;
          padding: 0.5rem 0.5rem 0.5rem 1.5rem;
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 650px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          background: rgba(17, 24, 39, 0.8);
          border-color: rgba(255, 255, 255, 0.12);
        }
        @media (max-width: 480px) {
          .hero-search-form {
            padding: 0.5rem;
          }
        }
        
        .search-bar-icon {
          color: var(--text-muted);
          flex-shrink: 0;
        }
        @media (max-width: 480px) {
          .search-bar-icon { display: none; }
        }
        
        .hero-search-input {
          flex-grow: 1;
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-family: var(--font-sans);
          font-size: 1.05rem;
          padding: 0.5rem 1rem;
        }
        
        .hero-search-btn {
          padding: 0.75rem 2rem;
          font-size: 1rem;
        }
        
        .hero-streams-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-top: 3rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .stream-badge-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          padding: 0.6rem 1.25rem;
          border-radius: 99px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .stream-badge-btn:hover {
          background: var(--card-bg-hover);
          border-color: var(--color-primary);
          color: white;
          transform: translateY(-1px);
        }
        
        .badge-logo-c {
          font-size: 1rem;
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 1.75rem;
          border-left: 4px solid var(--color-primary);
          padding-left: 0.75rem;
          color: var(--text-primary);
        }
        
        .tools-grid-section {
          padding: 3rem 0;
          position: relative;
          z-index: 2;
        }
        
        .tool-card {
          padding: 2rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .tool-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .tool-card p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .tool-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .predictor-color { background: rgba(var(--color-primary-rgb), 0.15); color: var(--color-primary); }
        .compare-color { background: rgba(var(--color-secondary-rgb), 0.15); color: var(--color-secondary); }
        .bookmarks-color { background: rgba(var(--color-success-rgb), 0.15); color: var(--color-success); }
        
        .tool-link-action {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        .tool-card:hover .tool-link-action {
          color: var(--color-secondary);
        }
        
        .featured-colleges-section {
          padding: 3rem 0 6rem 0;
          position: relative;
          z-index: 2;
        }
        .btn-view-all {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
        }
        
        .featured-college-card {
          overflow: hidden;
          cursor: pointer;
          height: 100%;
        }
        .feat-card-banner {
          height: 160px;
          position: relative;
          overflow: hidden;
        }
        .feat-card-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .featured-college-card:hover .feat-card-banner img {
          transform: scale(1.04);
        }
        .feat-avg-pkg {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(var(--color-success-rgb), 0.95);
          color: white;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .feat-card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .feat-card-body h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .feat-location {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .feat-rating-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }
        .feat-rating-row span {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};
