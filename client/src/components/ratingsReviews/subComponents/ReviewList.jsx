import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReviewsAsync,
  resetReviews,
} from '@reducers/reviewSlice';
import ReviewListTile from './ReviewListTile';

function ReviewList() {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.reviews.data);
  const hasMoreToFetch = useSelector((state) => state.reviews.hasMore);
  const [renderedReviews, setRenderedReviews] = useState([]);
  const [displayMoreReviewsButton, setDisplayMoreReviewsButton] = useState(true);
  const [scrollLocation, setScrollLocation] = useState([0, 5]);

  useEffect(() => {
    dispatch(resetReviews());
    dispatch(getReviewsAsync());
  }, []);

  useEffect(() => {
    if (displayMoreReviewsButton) setRenderedReviews(reviews.slice(0, 2));
  }, [reviews]);

  useEffect(() => {
    setRenderedReviews(reviews.slice(scrollLocation[0], scrollLocation[1]));
    console.log(reviews.slice(scrollLocation[0] - 5, scrollLocation[1] + 5));
  }, [scrollLocation]);

  const handleMoreReviews = () => {
    dispatch(getReviewsAsync());
  };

  const buttonStyle = {
    display: 'block',
    margin: '0 auto',
  };

  const handleScroll = (e) => {
    const percentScrolled = e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight);
    const pastMiddle = percentScrolled >= 0.9;
    if (pastMiddle) {
      if ((reviews.length < scrollLocation[1] + 5) && hasMoreToFetch) {
        dispatch(getReviewsAsync());
      }
      setScrollLocation((current) => [current[1], current[1] + 5]);
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
        <style>
          {`
      #reviewList::-webkit-scrollbar {
        background: transparent;
        width: 0;
      }
    `}
        </style>
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
            list.style.overflow = 'scroll';
            list.style.paddingRight = '10px';
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
