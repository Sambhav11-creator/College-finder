import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showText?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, size = 16, showText = false }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="rating-stars-container">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} size={size} className="star-filled" fill="currentColor" />
      ))}
      {hasHalfStar && <StarHalf size={size} className="star-filled" fill="currentColor" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="star-empty" />
      ))}
      {showText && <span className="rating-text-value">{rating.toFixed(1)}</span>}

      <style>{`
        .rating-stars-container {
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }
        .star-filled {
          color: var(--color-warning);
        }
        .star-empty {
          color: var(--text-muted);
          opacity: 0.4;
        }
        .rating-text-value {
          margin-left: 0.35rem;
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};
