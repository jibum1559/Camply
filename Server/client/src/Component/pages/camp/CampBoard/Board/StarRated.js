import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ value, onChange }) => {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(value);

  useEffect(() => {
    setRating(value);
  }, [value]);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <FaStar
            key={index}
            className="star"
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
