import React from 'react';

const StarRating = ({ rating = 0, maxStars = 5, size = 'medium', showCount = false, reviewCount = 0, onRatingChange = null, interactive = false }) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-2xl'
  };
  
  const renderStars = () => {
    const stars = [];
    const currentRating = interactive && hoverRating > 0 ? hoverRating : rating;
    
    for (let i = 1; i <= maxStars; i++) {
      const isFilled = i <= Math.floor(currentRating);
      const isHalfFilled = i === Math.ceil(currentRating) && currentRating % 1 !== 0;
      
      stars.push(
        <span
          key={i}
          className={`inline-block cursor-${interactive ? 'pointer' : 'default'} transition-colors duration-200 ${sizeClasses[size]}`}
          onClick={() => interactive && onRatingChange && onRatingChange(i)}
          onMouseEnter={() => interactive && setHoverRating(i)}
          onMouseLeave={() => interactive && setHoverRating(0)}
        >
          {isFilled ? (
            <span className="text-yellow-400">★</span>
          ) : isHalfFilled ? (
            <span className="relative">
              <span className="text-gray-300">★</span>
              <span className="absolute inset-0 text-yellow-400 overflow-hidden" style={{ width: '50%' }}>★</span>
            </span>
          ) : (
            <span className="text-gray-300">★</span>
          )}
        </span>
      );
    }
    
    return stars;
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {renderStars()}
      </div>
      {showCount && (
        <span className="text-sm text-gray-600">
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};

export default StarRating;