import React from 'react';
import PropTypes from 'prop-types';

function StarRatingView({ averageRating }) {

  // Only to test partial stars

  const randomNum = Math.random() * 3;
  let result;

  if (randomNum < 1) {
    result = 0.25;
  } else if (randomNum < 2) {
    result = 0.5;
  } else {
    result = 0.75;
  }

  averageRating += result;

  //

  const filledStars = Math.floor(averageRating);
  const filledQuarters = Math.floor((averageRating - filledStars) * 4);

  return (
    <div className="flex items-center" style={{ maxWidth: '100%' }}>
      {Array.from({ length: 5 }, (_, index) => {
        let starType = 'star';
        if (index < filledStars) {
          starType = 'starFull';
        } else if (index === filledStars && filledQuarters > 0) {
          starType = `star${filledQuarters}`;
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

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import classNames from 'classnames'; // assuming tailwind css is imported as a dependency
// import { starFilled, starEmpty } from './icons'; // assuming these icons are available
// import { setRating } from './ratingSlice'; // assuming this is the slice that manages the rating state

// function Rating() {
//   const dispatch = useDispatch();
//   const [rating, setRating] = useState(0);

//   const handleRating = (newRating) => {
//     dispatch(setRating(newRating));
//     setRating(newRating);
//   };

//   const renderStar = (index) => {
//     let fill = 0;
//     if (rating >= index) {
//       fill = 1;
//     } else if (rating > index - 1) {
//       fill = rating - (index - 1);
//     }

//     const starClasses = classNames('text-yellow-500', {
//       'opacity-0': fill === 0,
//       'opacity-25': fill === 0.25,
//       'opacity-50': fill === 0.5,
//       'opacity-75': fill === 0.75,
//       'opacity-100': fill === 1,
//     });

//     return (
//       <span key={index} className={starClasses}>
//         {starFilled}
//       </span>
//     );
//   };

//   const stars = [];
//   for (let i = 1; i <= 5; i++) {
//     stars.push(renderStar(i));
//   }

//   return (
//     <div>
//       <div className="flex items-center">{stars}</div>
//       <div className="flex items-center mt-2">
//         {[1, 2, 3, 4, 5].map((value) => (
//           <button
//             type="button"
//             key={value}
//             onClick={() => handleRating(value)}
//             className={classNames(
//               'mr-2 px-4 py-2 rounded-full',
//               rating >= value ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700',
//             )}
//           >
//             {value}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Rating;
