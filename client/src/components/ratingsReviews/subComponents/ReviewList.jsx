import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReviewsAsync,
} from '@reducers/reviewSlice';
import ReviewListTile from './ReviewListTile';

function ReviewList() {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.reviews.data);

  useEffect(() => {
    dispatch(getReviewsAsync());
    //dispatch(getReviewsAsync(page, 'newest', 40435));
  }, []);

  return (
    <div>
      Review List
      {reviews.map((review) => (
        <ReviewListTile review={review} key={review.review_id} />
      ))}
    </div>
  );
}

export default ReviewList;
