import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRenderedReviews, setAverageRating } from '@reducers/reviewSlice';
import StarRatingView from '@modular/StarRatingView';

function RatingsBreakdown() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.data);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  // Calculate average rating
  const avgRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
  dispatch(setAverageRating(avgRating));

  // Calculate rating breakdown
  const ratings = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  reviews.forEach((review) => {
    ratings[review.rating] += 1;
  });

  useEffect(() => {
    console.log(filteredReviews);
    dispatch(setRenderedReviews(reviews));
  }, [reviews]);

  useEffect(() => {
    dispatch(setRenderedReviews(filteredReviews));
  }, [filteredReviews]);

  // Handle filter clicks
  const handleFilterClick = (rating) => {
    let newFilters = [...activeFilters];
    if (newFilters.includes(rating)) {
      newFilters = newFilters.filter((filter) => filter !== rating);
    } else {
      newFilters.push(rating);
    }
    setActiveFilters(newFilters);
    setFilteredReviews(reviews.filter((review) => newFilters.includes(review.rating)));
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
    setFilteredReviews(reviews);
    dispatch(setRenderedReviews(reviews));
  };
  return (
    <div id="RatingsBreakdown">
      {/* Display average rating */}
      <div className="md:ml-4 grid items-end grid-cols-1 justify-items-center pt-2 py-3 text-3xl lg:text-4xl" id="overallRating">
        <div className="flex md:inline-flex md:justify-self-start border rounded-md border-gray-500 font-xs border p-1 rounded bg-stone-100 dark:bg-stone-700">
          <div className="flex flex-col items-center">
            <StarRatingView averageRating={avgRating} />
            <span className="mt-3">{`${reviews.length} reviews`}</span>
          </div>
        </div>
        <div className="overflow-auto" />
      </div>

      {/* Display rating breakdown */}
      <div>
        <div className="grid grid-rows-5">
          {Object.entries(ratings).map(([rating, count]) => (
            <button
              className="bg-white dark:bg-grey-500"
              type="button"
              key={rating}
              onClick={() => handleFilterClick(parseInt(rating, 10))}
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="pl-[10px] whitespace-pre">{`${rating} Stars`}</span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '10px',
                    width: '100px',
                    height: '10px',
                    border: '1px solid grey',
                    marginRight: '10px',
                  }}
                >
                  <div
                    className="bg-secondary-300 dark:bg-primary-300"
                    style={{
                      display: 'inline-block',
                      width: `${(count / reviews.length) * 100}%`,
                      height: '100%',
                    }}
                  />
                  <div
                    className="bg-primary-200 dark:bg-secondary-200"
                    style={{
                      display: 'inline-block',
                      width: `${100 - (count / reviews.length) * 100}%`,
                      height: '100%',
                    }}
                  />
                </div>
                <span className="pr-[10px]">{`${count}`}</span>
                {activeFilters.includes(parseInt(rating, 10)) && (
                  <i className="fa-solid fa-caret-left text-secondary-300 dark:bg-primary-300" style={{ backgroundColor: 'transparent' }} />
                )}
              </div>
            </button>

          ))}
        </div>

        {/* Display applied filters */}
        {activeFilters.length > 0 && (
          <div>
            {`Filters applied: ${activeFilters
              .map((filter) => `${filter} stars`)
              .join(', ')}`}
            <button type="button" onClick={clearFilters}>Remove all filters</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RatingsBreakdown;
