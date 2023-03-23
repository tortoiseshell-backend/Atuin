import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@reducers/modalSlice';
import Modal from '@modular/Modal';
import ReviewList from './subComponents/ReviewList';
import SortOptions from './subComponents/SortOptions';
import RatingsBreakdown from './subComponents/RatingsBreakdown';
import ProductBreakdown from './subComponents/ProductBreakdown';
import NewReviewModal from './subComponents/NewReviewModal';

function RatingsReviews() {
  const dispatch = useDispatch();
  const rendered = useSelector((state) => state.modal.show);
  const toggleModal = () => {
    dispatch(toggle());
  };

  return (
    <div className="p-5 border-solid border-2 border-sky-500 justify-center max-w-screen-lg mx-auto">
      <h3 className="text-gray-600">RATINGS & REVIEWS</h3>
      <div id="container" className="flex flex-col md:flex-row">
        <div id="breakdown" className="md:w-4/10 flex flex-col">
          <RatingsBreakdown />
          <ProductBreakdown />
        </div>
        <div id="reviews" className="md:w-6/10 flex flex-col max-w-full">
          <div className="flex-none flex justify-start">
            <SortOptions />
          </div>
          <div style={{ maxWidth: 'max-content' }} className="flex-auto max-w-full overflow-x-auto">
            <ReviewList />
          </div>
        </div>
      </div>
      <div>
        <h1>Not a modal</h1>
        <button type="button" onClick={toggleModal}>Write a review</button>
        {rendered ? <Modal content={<NewReviewModal />} /> : null}
      </div>
    </div>
  );
}

export default RatingsReviews;
