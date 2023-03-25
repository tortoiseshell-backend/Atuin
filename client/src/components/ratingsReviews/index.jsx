import React from 'react';
import { useDispatch } from 'react-redux';
import { toggle, setModalProps, setModalType } from '@reducers/modalSlice';
import ReviewList from './subComponents/ReviewList';
import SortOptions from './subComponents/SortOptions';
import RatingsBreakdown from './subComponents/RatingsBreakdown';
import ProductBreakdown from './subComponents/ProductBreakdown';

function RatingsReviews() {
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(setModalProps({}));
    dispatch(setModalType('NewReviewModal'));
    dispatch(toggle());
  };

  return (
    <div className="p-5 border-solid border-2 border-sky-500 justify-center max-w-screen-lg mx-auto">
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
      <div>
        <h1>Not a modal</h1>
        <button type="button" onClick={toggleModal}>Write a review</button>
      </div>
    </div>

  );
}

export default RatingsReviews;
