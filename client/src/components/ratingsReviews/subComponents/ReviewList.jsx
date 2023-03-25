import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReviewsAsync,
  resetReviews,
} from '@reducers/reviewSlice';
import $ from 'jquery';
import ReviewListTile from './ReviewListTile';

function ReviewList() {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.reviews.data);
  const hasMoreToFetch = useSelector((state) => state.reviews.hasMore);
  const [renderedReviews, setRenderedReviews] = useState([]);
  const [displayMoreReviewsButton, setDisplayMoreReviewsButton] = useState(true);
  const [scrollLocation, setScrollLocation] = useState([0, 20]);

  useEffect(() => {
    dispatch(resetReviews());
    dispatch(getReviewsAsync());
  }, []);

  useEffect(() => {
    if (displayMoreReviewsButton) setRenderedReviews(reviews.slice(0, 2));
  }, [reviews]);

  useEffect(() => {
    setRenderedReviews(reviews.slice(...scrollLocation));
  }, [scrollLocation]);

  const handleMoreReviews = () => {
    dispatch(getReviewsAsync());
  };

  const buttonStyle = {
    display: 'block',
    margin: '0 auto',
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight;
    const div = $(e.target);
    console.log('--------------------\ne.target.scrollTop: ', e.target.scrollTop);
    console.log('e.target.scrollHeight: ', e.target.scrollHeight);
    console.log('e.target.scrollBottom: ', e.target.clientBottom);
    console.log('e.target.height: ', div);
    if (bottom) {
      if ((reviews.length < scrollLocation[1] + 20) && hasMoreToFetch) {
        dispatch(getReviewsAsync());
      }
      setScrollLocation((current) => [current[1], current[1] + 20]);
    }
  };

  return (
    <div
      style={{ paddingRight: '10px' }}
    >
      <div
        id="reviewList"
        style={{ maxHeight: 'auto' }}
        onScroll={handleScroll}
      >
        {renderedReviews.map((review) => (
          <ReviewListTile review={review} key={review.review_id} />
        ))}
      </div>
      {displayMoreReviewsButton && (
        <button
          type="button"
          style={buttonStyle}
          onClick={() => {
            const list = document.getElementById('reviewList');
            list.style.maxHeight = '65em';
            list.style.overflowY = 'scroll';
            setDisplayMoreReviewsButton(false);
            handleMoreReviews();
          }}
        >
          More Reviews
        </button>
      )}
    </div>
  );
}

export default ReviewList;
