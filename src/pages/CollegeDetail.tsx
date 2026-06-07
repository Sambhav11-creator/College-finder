import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useColleges } from '../context/CollegeContext';
import { useSaved } from '../context/SavedContext';
import { Skeleton } from '../components/Common/Skeleton';
import { TabOverview } from '../components/Detail/TabOverview';
import { TabCourses } from '../components/Detail/TabCourses';
import { TabPlacements } from '../components/Detail/TabPlacements';
import { TabReviews } from '../components/Detail/TabReviews';
import { TabDiscussion } from '../components/Detail/TabDiscussion';
import { RatingStars } from '../components/Common/RatingStars';
import { MapPin, IndianRupee, Briefcase, Award, Bookmark, ArrowLeft, GitCompare } from 'lucide-react';

type TabType = 'overview' | 'courses' | 'placements' | 'reviews' | 'discussion';

export const CollegeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { colleges, getCollegeReviews } = useColleges();
  const { isSaved, toggleSaveCollege, isComparing, addToCompare, removeFromCompare, compareColleges } = useSaved();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loading, setLoading] = useState(true);

  // Find college
  const college = colleges.find((c) => c.id === id);

  // Load institution details dynamically
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450); // Database query load delay

    return () => clearTimeout(timer);
  }, [id]);

  if (!college) {
    return (
      <div className="container err-detail-box">
        <div className="glass-panel error-inner">
          <h3>College Not Found</h3>
          <p>We couldn't find an institution matching ID "{id}".</p>
          <button className="btn btn-primary" onClick={() => navigate('/search')}>
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const saved = isSaved(college.id);
  const comparing = isComparing(college.id);

  const handleCompareToggle = () => {
    if (comparing) {
      removeFromCompare(college.id);
    } else {
      const added = addToCompare(college.id);
      if (!added && compareColleges.length >= 3) {
        alert('You can only compare a maximum of 3 colleges.');
      }
    }
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <TabOverview college={college} />;
      case 'courses':
        return <TabCourses college={college} />;
      case 'placements':
        return <TabPlacements college={college} />;
      case 'reviews':
        return <TabReviews college={college} />;
      case 'discussion':
        return <TabDiscussion college={college} />;
      default:
        return <TabOverview college={college} />;
    }
  };

  return (
    <div className="detail-page-container container">
      {/* Back button */}
      <button className="btn-back-link" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
        <span>Back to listings</span>
      </button>

      {loading ? (
        <Skeleton type="detail" />
      ) : (
        <div className="detail-layout animate-fade-in">
          {/* Header Banner Block */}
          <div className="detail-header-hero glass-panel">
            <div className="hero-banner-image-container">
              <img src={college.bannerImage} alt={college.name} className="hero-banner-img" />
              <div className="hero-banner-overlay"></div>
            </div>

            <div className="hero-content-panel">
              <div className="hero-logo-box">{college.logo}</div>
              <div className="hero-titles">
                <div className="hero-title-row">
                  <h2>{college.name}</h2>
                  <div className="hero-actions-group">
                    <button
                      className={`hero-action-icon-btn ${saved ? 'active' : ''}`}
                      onClick={() => toggleSaveCollege(college.id)}
                      title={saved ? 'Remove Bookmark' : 'Save College'}
                    >
                      <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      className={`hero-action-icon-btn ${comparing ? 'active' : ''}`}
                      onClick={handleCompareToggle}
                      title={comparing ? 'Remove from Compare' : 'Add to Compare'}
                    >
                      <GitCompare size={18} />
                    </button>
                  </div>
                </div>

                <div className="hero-meta-row">
                  <span className="hero-meta-item">
                    <MapPin size={14} />
                    {college.location}
                  </span>
                  <span className="hero-meta-item">
                    Established: {college.established}
                  </span>
                  <span className={`badge ${college.type === 'Government' ? 'badge-gov' : 'badge-private'}`}>
                    {college.type} Institute
                  </span>
                </div>

                <div className="hero-rating-stars-row">
                  <RatingStars rating={college.rating} size={16} showText={true} />
                  <span className="rating-desc">NIRF: #{college.rankings[0]?.rank || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Quick stats shelf */}
            <div className="hero-stats-shelf">
              <div className="shelf-item">
                <IndianRupee size={16} className="shelf-icon-fees" />
                <div className="shelf-info">
                  <span className="shelf-label">Avg Annual Fees</span>
                  <span className="shelf-val">₹{college.fees >= 100000 ? `${(college.fees / 100000).toFixed(2)} Lakhs` : college.fees.toLocaleString()}</span>
                </div>
              </div>

              <div className="shelf-item">
                <Briefcase size={16} className="shelf-icon-pkg" />
                <div className="shelf-info">
                  <span className="shelf-label">Avg Placements</span>
                  <span className="shelf-val text-success">₹{college.averagePackage} LPA</span>
                </div>
              </div>

              <div className="shelf-item">
                <Award size={16} className="shelf-icon-highest" />
                <div className="shelf-info">
                  <span className="shelf-label">Highest Package</span>
                  <span className="shelf-val text-secondary">₹{college.highestPackage} LPA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="detail-tabs-navbar glass-panel">
            <button className={`tab-nav-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              Overview
            </button>
            <button className={`tab-nav-btn ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>
              Courses & Fees
            </button>
            <button className={`tab-nav-btn ${activeTab === 'placements' ? 'active' : ''}`} onClick={() => setActiveTab('placements')}>
              Placements
            </button>
            <button className={`tab-nav-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
              Reviews ({getCollegeReviews(college.id).length})
            </button>
            <button className={`tab-nav-btn ${activeTab === 'discussion' ? 'active' : ''}`} onClick={() => setActiveTab('discussion')}>
              Q&A Discussion
            </button>
          </div>

          {/* Render Tab Contents */}
          <div className="detail-tab-body">
            {renderActiveTabContent()}
          </div>
        </div>
      )}

      <style>{`
        .detail-page-container {
          padding-top: 1.5rem;
        }
        .btn-back-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          margin-bottom: 1.25rem;
          transition: color 0.2s ease;
          width: fit-content;
        }
        .btn-back-link:hover {
          color: var(--color-primary);
        }
        
        .err-detail-box {
          padding: 4rem 0;
          text-align: center;
        }
        .error-inner {
          padding: 3rem;
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .detail-header-hero {
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        
        .hero-banner-image-container {
          height: 200px;
          position: relative;
          width: 100%;
          background: var(--bg-tertiary);
        }
        .hero-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-banner-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, rgba(8, 12, 20, 0.2) 0%, rgba(8, 12, 20, 0.9) 100%);
        }
        
        .hero-content-panel {
          padding: 0 2rem 2rem 2rem;
          display: flex;
          gap: 1.5rem;
          margin-top: -50px;
          position: relative;
          z-index: 5;
          border-bottom: 1px solid var(--border-light);
        }
        @media (max-width: 640px) {
          .hero-content-panel {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 0 1.25rem 1.5rem 1.25rem;
            margin-top: -40px;
          }
        }
        
        .hero-logo-box {
          width: 90px;
          height: 90px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border: 3px solid var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.6rem;
          color: white;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
          flex-shrink: 0;
        }
        
        .hero-titles {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex-grow: 1;
          padding-top: 35px;
        }
        @media (max-width: 640px) {
          .hero-titles { padding-top: 10px; }
        }
        
        .hero-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }
        @media (max-width: 640px) {
          .hero-title-row {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }
        }
        .hero-title-row h2 {
          font-size: 1.75rem;
          font-weight: 800;
          color: white;
          line-height: 1.3;
        }
        
        .hero-actions-group {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        .hero-action-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .hero-action-icon-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        .hero-action-icon-btn.active {
          color: var(--color-secondary);
          border-color: rgba(236, 72, 153, 0.3);
          background: rgba(236, 72, 153, 0.08);
        }
        
        .hero-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        @media (max-width: 640px) {
          .hero-meta-row { justify-content: center; }
        }
        .hero-meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-muted);
        }
        
        .hero-rating-stars-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        @media (max-width: 640px) {
          .hero-rating-stars-row { justify-content: center; }
        }
        .rating-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          border: 1px solid var(--border-light);
        }
        
        .hero-stats-shelf {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: rgba(0, 0, 0, 0.15);
        }
        @media (max-width: 640px) {
          .hero-stats-shelf {
            grid-template-columns: 1fr;
          }
        }
        .shelf-item {
          padding: 1.25rem 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-right: 1px solid var(--border-light);
        }
        .shelf-item:last-child {
          border-right: none;
        }
        @media (max-width: 640px) {
          .shelf-item {
            border-right: none;
            border-bottom: 1px solid var(--border-light);
            padding: 1rem;
            justify-content: center;
          }
          .shelf-item:last-child { border-bottom: none; }
        }
        
        .shelf-icon-fees { color: #818cf8; }
        .shelf-icon-pkg { color: var(--color-success); }
        .shelf-icon-highest { color: var(--color-secondary); }
        
        .shelf-info {
          display: flex;
          flex-direction: column;
        }
        .shelf-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .shelf-val {
          font-size: 1rem;
          font-weight: 700;
          color: white;
        }
        
        .detail-tabs-navbar {
          display: flex;
          overflow-x: auto;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
          background: rgba(13, 19, 33, 0.4);
          scrollbar-width: none;
        }
        .detail-tabs-navbar::-webkit-scrollbar { display: none; }
        
        .tab-nav-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
          font-family: var(--font-sans);
        }
        .tab-nav-btn:hover {
          background: rgba(255, 255, 255, 0.03);
          color: white;
        }
        .tab-nav-btn.active {
          background: var(--color-primary);
          color: white;
          box-shadow: 0 4px 10px var(--color-primary-glow);
        }
        
        .detail-tab-body {
          width: 100%;
        }
      `}</style>
    </div>
  );
};
