import { getReviewsAsync } from '@reducers/reviewSlice';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import RatingsBreakdown from './subComponents/RatingsBreakdown';
import ProductBreakdown from './subComponents/ProductBreakdown';
import SortOptions from './subComponents/SortOptions';
import ReviewList from './subComponents/ReviewList';

function RatingsReviews() {
  const dispatch = useDispatch();
  const productID = useSelector((state) => state.product.id);

  useEffect(() => {
    dispatch(getReviewsAsync());
  }, [productID]);

  return (
    <div id="ratingsReviews" className="p-5 border-solid justify-center max-w-screen-lg mx-auto">
      <div className="flex flex-col md:flex-row">
        <div id="breakdown" className="w-full md:w-2/5">
          <RatingsBreakdown />
          <ProductBreakdown />
        </div>
        <div id="reviews" className="w-full md:w-3/5  mr-1em">
          <div className="flex justify-between">
            <SortOptions />
          </div>
          <div className="w-full max-w-full overflow-x-auto">
            <ReviewList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingsReviews;
