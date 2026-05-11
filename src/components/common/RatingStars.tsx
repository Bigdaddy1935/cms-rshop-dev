"use client";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
type RatingStarsProps = {
  rating: number;
  size?: number;
  className?: string;
  showNumber?: boolean;
  singleStarHighlight?: boolean; // فعال‌کننده حالت ستاره زرد با عدد
};

const RatingStars = ({
  rating,
  size = 16,
  className = "text-yellow-500",
  showNumber = true,
  singleStarHighlight = false,
}: RatingStarsProps) => {
  if (singleStarHighlight) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <FaStar size={size} />
        {showNumber && (
          <span className="text-gray-600 text-sm">{rating.toFixed(1)}</span>
        )}
      </div>
    );
  }

  // حالت قبلی ستاره‌ها
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <FaStar key={`full-${i}`} size={size} />
        ))}

        {hasHalfStar && (
          <FaStarHalfAlt
            key="half"
            size={size}
            className="transform scale-x-[-1]"
          />
        )}

        {Array.from({ length: emptyStars }).map((_, i) => (
          <FaRegStar key={`empty-${i}`} size={size} />
        ))}
        
        {showNumber && (
          <span className="text-gray-600 text-sm">{rating.toFixed(1)}</span>
        )}
      </div>
    </div>
  );
};

export default RatingStars;
