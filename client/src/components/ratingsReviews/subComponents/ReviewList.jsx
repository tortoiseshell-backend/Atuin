/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsAsync, resetReviews } from '@reducers/reviewSlice';
import ReviewListTile from './ReviewListTile';

function ReviewList() {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.reviews.data);
  const hasMoreToFetch = useSelector((state) => state.reviews.hasMore);
  const [renderedReviews, setRenderedReviews] = useState([]);
  const [displayMoreReviewsButton, setDisplayMoreReviewsButton] = useState(true);
  const elementPointerRef = useRef(null);

  useEffect(() => {
    dispatch(resetReviews());
    dispatch(getReviewsAsync());
  }, []);

  useEffect(() => {
    console.log('elementPointerRef', elementPointerRef.current);
  }, [renderedReviews]);

  useEffect(() => {
    if (displayMoreReviewsButton) {
      setRenderedReviews(reviews.slice(0, 2));
    } else if (!displayMoreReviewsButton) {
      setRenderedReviews(reviews.slice(0, renderedReviews.length + 5));
    }
  }, [reviews]);

  const isElementOnScreen = (element, container) => {
    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return (
      elementRect.bottom > containerRect.top
      && elementRect.top < containerRect.bottom
    );
  };

  const handleScroll = (e) => {
    e.preventDefault();
    const list = e.target;
    const elementPointer = elementPointerRef.current;
    const scrolledToBottom = list.scrollTop + list.clientHeight >= (list.scrollHeight - 100);

    if (scrolledToBottom && hasMoreToFetch) {
      dispatch(getReviewsAsync());
    }

    if (isElementOnScreen(elementPointer, list)) {
      setRenderedReviews((rendered) => reviews.slice(0, rendered.length + 5));
    }
  };

  return (
    <div id="listContainer" style={{ paddingRight: '10px' }}>
      <div id="reviewList" style={{ maxHeight: 'auto' }} onScroll={handleScroll}>
        <style>
          {`
            #reviewList::-webkit-scrollbar {
              background: transparent;
              width: 0;
            }
            scroll-behavior: smooth;
          `}
        </style>
        {renderedReviews.map((review, idx) => (
          <div
            ref={idx === (renderedReviews.length - 5) ? elementPointerRef : null}
            key={review.id}
            id={`review-${idx}`}
          >
            <ReviewListTile review={review} />
          </div>
        ))}
      </div>
      {displayMoreReviewsButton && reviews.length > 2 && (
        <button
          type="button"
          style={{ display: 'block', margin: '0 auto' }}
          onClick={() => {
            const list = document.getElementById('reviewList');
            list.style.maxHeight = '45em';
            list.style.overflow = 'scroll';
            list.style.paddingRight = '10px';
            setDisplayMoreReviewsButton(false);
            setRenderedReviews(reviews.slice(0, 10));
          }}
        >
          More Reviews
        </button>
      )}
    </div>
  );
}

export default ReviewList;
