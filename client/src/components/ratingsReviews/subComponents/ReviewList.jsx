import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReviewsAsync,
} from '@reducers/reviewSlice';
import ReviewListTile from './ReviewListTile';

function ReviewList() {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.reviews.data);
  const page = useSelector((state) => state.reviews.page);
  const sort = useSelector((state) => state.sort.sortBy);
  // const prodId = useSelector((state) => state.product.id);

  useEffect(() => {
    // dispatch(getReviewsAsync(page, sort, prodId));
    dispatch(getReviewsAsync(1, 'relevant', 40435));
  }, []);

  return (
    <div>
      Review List
      {console.log('reviewOBJ: ', reviews)}
      {reviews.map((review) => {
        console.log(review);
        return (
          <ReviewListTile review={review} key={review.review_id} />
        );
      })}
    </div>
  );
}

export default ReviewList;
