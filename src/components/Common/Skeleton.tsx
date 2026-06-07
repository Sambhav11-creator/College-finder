import React from 'react';

interface SkeletonProps {
  type?: 'card' | 'text' | 'list' | 'detail';
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ type = 'text', count = 1 }) => {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="skeleton-grid">
        {items.map((_, index) => (
          <div key={index} className="skeleton-card glass-panel">
            <div className="skeleton-banner shimmer"></div>
            <div className="skeleton-body">
              <div className="skeleton-title shimmer"></div>
              <div className="skeleton-line shimmer" style={{ width: '40%' }}></div>
              <div className="skeleton-meta">
                <div className="skeleton-meta-item shimmer"></div>
                <div className="skeleton-meta-item shimmer"></div>
              </div>
              <div className="skeleton-footer">
                <div className="skeleton-btn shimmer"></div>
                <div className="skeleton-btn shimmer"></div>
              </div>
            </div>
          </div>
        ))}

        <style>{`
          .skeleton-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
            width: 100%;
          }
          .skeleton-card {
            overflow: hidden;
            border: 1px solid var(--border-light);
            border-radius: var(--radius-md);
            height: 380px;
          }
          .skeleton-banner {
            height: 150px;
            width: 100%;
          }
          .skeleton-body {
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          .skeleton-title {
            height: 24px;
            width: 80%;
            border-radius: 4px;
          }
          .skeleton-line {
            height: 16px;
            border-radius: 4px;
          }
          .skeleton-meta {
            display: flex;
            gap: 1rem;
            margin: 0.5rem 0;
          }
          .skeleton-meta-item {
            height: 20px;
            width: 60px;
            border-radius: 4px;
          }
          .skeleton-footer {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
          }
          .skeleton-btn {
            height: 38px;
            width: 45%;
            border-radius: 8px;
          }
        `}</style>
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="skeleton-detail-container">
        <div className="skeleton-detail-header shimmer"></div>
        <div className="skeleton-detail-tabs shimmer"></div>
        <div className="skeleton-detail-content glass-panel">
          <div className="skeleton-title shimmer" style={{ width: '30%', height: '32px' }}></div>
          <div className="skeleton-line shimmer" style={{ width: '90%' }}></div>
          <div className="skeleton-line shimmer" style={{ width: '95%' }}></div>
          <div className="skeleton-line shimmer" style={{ width: '85%' }}></div>
          <div className="skeleton-line shimmer" style={{ width: '60%' }}></div>
          <div className="skeleton-grid-2" style={{ marginTop: '2rem' }}>
            <div className="skeleton-card-small shimmer"></div>
            <div className="skeleton-card-small shimmer"></div>
          </div>
        </div>

        <style>{`
          .skeleton-detail-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            width: 100%;
            padding-top: 1.5rem;
          }
          .skeleton-detail-header {
            height: 250px;
            border-radius: var(--radius-lg);
          }
          .skeleton-detail-tabs {
            height: 50px;
            border-radius: var(--radius-md);
            width: 60%;
          }
          .skeleton-detail-content {
            padding: 2.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            height: 400px;
          }
          .skeleton-grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
          .skeleton-card-small {
            height: 120px;
            border-radius: var(--radius-md);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="skeleton-text-container">
      {items.map((_, index) => (
        <div key={index} className="skeleton-text-line shimmer" style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}></div>
      ))}

      <style>{`
        .skeleton-text-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }
        .skeleton-text-line {
          height: 16px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};
