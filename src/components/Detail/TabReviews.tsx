import React, { useState } from 'react';
import { type College, type Review } from '../../types';
import { useColleges } from '../../context/CollegeContext';
import { RatingStars } from '../Common/RatingStars';
import { MessageSquare, PlusCircle, Star } from 'lucide-react';

interface TabReviewsProps {
  college: College;
}

export const TabReviews: React.FC<TabReviewsProps> = ({ college }) => {
  const { getCollegeReviews, addReview } = useColleges();
  const reviews = getCollegeReviews(college.id);

  // Review Form States
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState<Review['category']>('Overall');
  const [error, setError] = useState('');

  // Calculate aggregates
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews 
    : college.rating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!comment.trim() || comment.trim().length < 15) {
      setError('Review comment must be at least 15 characters long.');
      return;
    }

    addReview(college.id, name, rating, comment, category);
    
    // Reset form
    setName('');
    setComment('');
    setRating(5);
    setCategory('Overall');
    setShowForm(false);
  };

  return (
    <div className="reviews-tab-container animate-fade-in">
      <div className="reviews-layout">
        
        {/* Left column - Review Stats Dashboard */}
        <div className="reviews-sidebar">
          <div className="reviews-summary-card glass-panel">
            <h3>Student Reviews</h3>
            <div className="summary-rating-box">
              <span className="summary-rating-num">{avgRating.toFixed(1)}</span>
              <div className="summary-stars">
                <RatingStars rating={avgRating} size={18} />
                <span>Based on {totalReviews} reviews</span>
              </div>
            </div>

            <div className="rating-breakdown-list">
              <div className="breakdown-row">
                <span className="breakdown-label">Academics</span>
                <div className="breakdown-bar-bg">
                  <div className="breakdown-bar-fill" style={{ width: `${(college.rating / 5) * 100}%` }}></div>
                </div>
                <span className="breakdown-value">{(college.rating - 0.1).toFixed(1)}</span>
              </div>
              <div className="breakdown-row">
                <span className="breakdown-label">Placements</span>
                <div className="breakdown-bar-bg">
                  <div className="breakdown-bar-fill" style={{ width: `${((college.rating + 0.1) / 5) * 100}%` }}></div>
                </div>
                <span className="breakdown-value">{Math.min(5, college.rating + 0.1).toFixed(1)}</span>
              </div>
              <div className="breakdown-row">
                <span className="breakdown-label">Campus Life</span>
                <div className="breakdown-bar-bg">
                  <div className="breakdown-bar-fill" style={{ width: `${((college.rating - 0.2) / 5) * 100}%` }}></div>
                </div>
                <span className="breakdown-value">{(college.rating - 0.2).toFixed(1)}</span>
              </div>
            </div>

            <button className="btn-write-review" onClick={() => setShowForm(!showForm)}>
              <PlusCircle size={16} />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Right column - Reviews List and Review Form */}
        <div className="reviews-main">
          {showForm && (
            <div className="review-form-card glass-panel animate-fade-in">
              <h3>Share Your Experience</h3>
              <form onSubmit={handleSubmit} className="review-form">
                {error && <div className="form-error-msg">{error}</div>}
                
                <div className="grid-2-col">
                  <div className="input-group">
                    <label className="input-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Category</label>
                    <select 
                      className="form-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Review['category'])}
                    >
                      <option value="Overall">Overall Experience</option>
                      <option value="Academics">Academics & Faculty</option>
                      <option value="Placements">Placements & Jobs</option>
                      <option value="Infrastructure">Infrastructure & Hostel</option>
                      <option value="Campus Life">Campus Life & Socials</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Rating</label>
                  <div className="rating-star-selector">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        className={`star-select-btn ${rating >= num ? 'active' : ''}`}
                        onClick={() => setRating(num)}
                      >
                        <Star size={24} fill={rating >= num ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Your Review Comments</label>
                  <textarea 
                    rows={4}
                    className="form-input textarea-field"
                    placeholder="Tell us about the courses, placements, faculty, infrastructure..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-actions-row">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="reviews-list-container">
            {reviews.length === 0 ? (
              <div className="empty-reviews-state glass-panel">
                <MessageSquare size={36} className="empty-reviews-icon" />
                <h4>No Reviews Yet</h4>
                <p>Be the first to share your experience about this college!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-card-item glass-panel">
                  <div className="review-header">
                    <div className="review-user-avatar">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="review-user-meta">
                      <h4>{review.userName}</h4>
                      <span className="review-date">Reviewed on {review.date}</span>
                    </div>
                    <div className="review-rating-box">
                      <RatingStars rating={review.rating} size={14} />
                      <span className="category-badge">{review.category}</span>
                    </div>
                  </div>
                  <p className="review-text-comment">"{review.comment}"</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <style>{`
        .reviews-tab-container {
          width: 100%;
        }
        .reviews-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .reviews-layout {
            grid-template-columns: 1fr;
          }
        }
        
        .reviews-summary-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .reviews-summary-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .summary-rating-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-light);
          padding: 1rem;
          border-radius: var(--radius-md);
        }
        .summary-rating-num {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--color-warning);
          line-height: 1;
        }
        .summary-stars {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .summary-stars span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        
        .rating-breakdown-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .breakdown-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
        }
        .breakdown-label {
          width: 80px;
          color: var(--text-secondary);
        }
        .breakdown-bar-bg {
          flex-grow: 1;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 99px;
          overflow: hidden;
        }
        .breakdown-bar-fill {
          height: 100%;
          background: var(--color-warning);
          border-radius: 99px;
        }
        .breakdown-value {
          width: 20px;
          text-align: right;
          font-weight: 700;
          color: var(--text-primary);
        }
        
        .btn-write-review {
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px var(--color-primary-glow);
        }
        .btn-write-review:hover {
          background: var(--color-primary-hover);
        }
        
        .review-form-card {
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .review-form-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }
        .review-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .grid-2-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 480px) {
          .grid-2-col {
            grid-template-columns: 1fr;
          }
        }
        .rating-star-selector {
          display: flex;
          gap: 0.5rem;
        }
        .star-select-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .star-select-btn:hover {
          transform: scale(1.1);
        }
        .star-select-btn.active {
          color: var(--color-warning);
        }
        .textarea-field {
          resize: vertical;
        }
        .form-actions-row {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }
        .form-error-msg {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .reviews-list-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .empty-reviews-state {
          padding: 3rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .empty-reviews-icon {
          color: var(--text-muted);
        }
        .empty-reviews-state h4 {
          font-size: 1.1rem;
          font-weight: 700;
        }
        .empty-reviews-state p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        
        .review-card-item {
          padding: 1.5rem;
        }
        .review-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .review-user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
        }
        .review-user-meta {
          flex-grow: 1;
        }
        .review-user-meta h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .review-date {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        
        .review-rating-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
        }
        .category-badge {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-light);
          padding: 0.15rem 0.5rem;
          font-size: 0.7rem;
          border-radius: 4px;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .review-text-comment {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};
