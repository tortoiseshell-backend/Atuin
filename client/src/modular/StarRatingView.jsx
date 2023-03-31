import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function StarRatingView({ averageRating }) {
  const filledStars = Math.floor(averageRating);
  const filledQuarters = Math.floor((averageRating - filledStars) * 4);
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  return (
    <div className="flex items-baseline" style={{ maxWidth: '100%' }}>
      {Array.from({ length: 5 }, (_, index) => {
        let starType = '';
        if (isDarkTheme) starType += 'D';
        starType += 'star';
        if (index < filledStars) {
          starType += 'Full';
        } else if (index === filledStars && filledQuarters > 0) {
          starType += `${filledQuarters}`;
        }
        return (
          <span key={index} className={`${starType} fa fa-star`} style={{ fontSize: '100%' }} />
        );
      })}
      <span className="text-gray-400 ml-1">{averageRating.toFixed(1)}</span>
    </div>
  );
}

StarRatingView.propTypes = {
  averageRating: PropTypes.number.isRequired,
};

export default StarRatingView;
