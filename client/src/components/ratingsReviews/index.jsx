import React from 'react';
import ReviewList from './subComponents/ReviewList';
import SortOptions from './subComponents/SortOptions';
import RatingsBreakdown from './subComponents/RatingsBreakdown';
import ProductBreakdown from './subComponents/ProductBreakdown';
import NewReviewModal from './subComponents/NewReviewModal';

function RatingsReviews() {
  return (
    <div className="p-5 border-solid border-2 border-sky-500 justify-center max-w-screen-lg mx-auto">
      <h3 className="text-gray-600">RATINGS & REVIEWS</h3>
      <div id="container" className="flex flex-col md:flex-row">
        <div id="breakdown" className="md:w-4/10 flex flex-col">
          <RatingsBreakdown />
          <ProductBreakdown />
        </div>
        <div id="reviews" className="md:w-6/10 flex flex-col">
          <div className="flex-none flex justify-start">
            <SortOptions />
          </div>
          <div className="flex-auto">
            <ReviewList />
          </div>
        </div>
      </div>
      <NewReviewModal className="flex-none" />
    </div>
  );
}

export default RatingsReviews;
