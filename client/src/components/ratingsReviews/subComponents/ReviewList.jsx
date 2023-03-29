/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import { toggle, setModalProps, setModalType } from '@reducers/modalSlice';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReviewListTile from './ReviewListTile';

function ReviewList() {
  const dispatch = useDispatch();
  const [displayMoreReviewsButton, setDisplayMoreReviewsButton] = useState(true);
  const { characteristics } = useSelector((state) => state.reviews.metaData);
  const [renderedReviews, setRenderedReviews] = useState([]);
  const reviews = useSelector((state) => state.reviews.data);
  const [reachedBottom, setReachedBottom] = useState(false);
  const sort = useSelector((state) => state.sort.sortedBy);
  const elementPointerRef = useRef(null);

  useEffect(() => {
    //document.getElementById('reviewList').scrollTo(0, 0);
  }, [sort]);

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

  const toggleModal = () => {
    dispatch(setModalProps({}));
    dispatch(setModalType('NewReviewModal'));
    dispatch(toggle());
  };

  const handleScroll = (e) => {
    e.preventDefault();

    if (!reachedBottom) {
      const list = e.target;
      const elementPointer = elementPointerRef.current;
      const scrolledToBottom = (reviews.length - 5) === Number(elementPointer.getAttribute('data'));

      if (isElementOnScreen(elementPointer, list)) {
        setRenderedReviews((rendered) => reviews.slice(0, rendered.length + 5));
        if (scrolledToBottom) {
          setReachedBottom(true);
        }
      }
    }
  };

  return (
    <div data-testid="notAnything4" style={{ paddingRight: '10px' }}>
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
            key={`review-${review.id}-${idx}`}
            id={`review-${idx}`}
            data={idx}
          >
            <ReviewListTile key={`review-${review.id}-${idx}`} review={review} />
          </div>
        ))}
        {reachedBottom && (
          <span className="flex justify-center items-center">
            All caught up!
          </span>
        )}
      </div>
      <div className="flex justify-center">
        {displayMoreReviewsButton && reviews.length > 2 && (
          <button
            className="mt-3 border-solid border-[3px] border-violet-700 text-violet-700 font-semibold p-4"
            type="button"
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
        <div className="flex justify-center">
          <button
            type="button"
            className="mt-3 border-solid border-[3px] border-violet-700 text-violet-700 font-semibold p-4"
            onClick={toggleModal}
          >
            Write a review
          </button>
        </div>
      </div>

    </div>
  );
}

export default ReviewList;
