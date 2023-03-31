/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import { toggle, setModalProps, setModalType } from '@reducers/modalSlice';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviewsAsync } from '@reducers/reviewSlice';
import ReviewListTile from './ReviewListTile';

function ReviewList() {
  const dispatch = useDispatch();
  const [displayMoreReviewsButton, setDisplayMoreReviewsButton] = useState(true);
  const [renderedReviews, setRenderedReviews] = useState([]);
  const reviews = useSelector((state) => state.reviews.data);
  const filteredReviews = useSelector((state) => state.reviews.rendered);
  const prodID = useSelector((state) => state.product.id);
  // const [reachedBottom, setReachedBottom] = useState(false);
  const sort = useSelector((state) => state.sort.sortedBy);
  // const elementPointerRef = useRef(null);

  useEffect(() => {
    console.log(prodID);
    document.getElementById('reviewList').scrollTo(0, 0);
    dispatch(getReviewsAsync());
  }, [prodID]);

  useEffect(() => {
    if (filteredReviews.length > 0) {
      if (displayMoreReviewsButton) {
        setRenderedReviews(filteredReviews.slice(0, 2));
      } else {
        setRenderedReviews(filteredReviews);
      }
    }
  }, [filteredReviews]);

  useEffect(() => {
    document.getElementById('reviewList').scrollTo(0, 0);
    dispatch(getReviewsAsync());
  }, [sort]);

  useEffect(() => {
    if (displayMoreReviewsButton) {
      setRenderedReviews(reviews.slice(0, 2));
    } else if (!displayMoreReviewsButton) {
      // setRenderedReviews(reviews.slice(0, renderedReviews.length + 5));
      setRenderedReviews(reviews);
    }
  }, [reviews]);

  // const isElementOnScreen = (element, container) => {
  //   const elementRect = element.getBoundingClientRect();
  //   const containerRect = container.getBoundingClientRect();
  //   return (
  //     elementRect.bottom > containerRect.top
  //     && elementRect.top < containerRect.bottom
  //   );
  // };

  const toggleModal = () => {
    dispatch(setModalProps({}));
    dispatch(setModalType('NewReviewModal'));
    dispatch(toggle());
  };

  // const handleScroll = (e) => {
  //   e.preventDefault();

  //   if (!reachedBottom) {
  //     const list = e.target;
  //     const elementPointer = elementPointerRef.current;
  //     const scrolledToBottom = (filteredReviews.length - 10) === Number(elementPointer.getAttribute('data'));

  //     if (isElementOnScreen(elementPointer, list)) {
  //       setRenderedReviews((rendered) => filteredReviews.slice(0, rendered.length + 10));
  //       if (scrolledToBottom) {
  //         setReachedBottom(true);
  //       }
  //     }
  //   }onScroll={handleScroll}
  // };

  return (
    <div data-testid="scrollableDiv" style={{ paddingRight: '10px' }}>
      <div id="reviewList" style={{ maxHeight: 'auto' }}>
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
            // ref={idx === (renderedReviews.length - 5) ? elementPointerRef : null}
            key={`review-${review.id}-${idx}`}
            id={`review-${idx}`}
            data={idx}
          >
            <ReviewListTile key={`review-${review.id}-${idx}`} review={review} />
          </div>
        ))}
        {/* {reachedBottom && (
          <span data-testid="endScroll" className="flex justify-center items-center">
            All caught up!
          </span>
        )} */}
      </div>
      <div data-testid="moreReviewsButtonContainer" className="flex justify-center gap-3">
        {displayMoreReviewsButton && reviews.length > 2 && (
          <button
            data-testid="moreReviewsButton"
            className="mt-3 border-solid border-[3px] font-semibold p-4 border-violet-700 text-violet-700 dark:text-stone-300 hover:bg-white dark:hover:bg-secondary-200"
            type="button"
            onClick={() => {
              const list = document.getElementById('reviewList');
              list.style.maxHeight = '55em';
              list.style.overflow = 'scroll';
              list.style.paddingRight = '10px';
              setDisplayMoreReviewsButton(false);
              // setRenderedReviews(reviews.slice(0, 10));
              setRenderedReviews(reviews);
            }}
          >
            MORE REVIEWS
          </button>
        )}
        <div data-testid="openWriteReviewModel" className="flex justify-center">
          <button
            type="button"
            className="mt-3 border-solid border-[3px] font-semibold p-4 border-violet-700 text-violet-700 dark:text-stone-300 hover:bg-white dark:hover:bg-secondary-200"
            onClick={toggleModal}
          >
            NEW REVIEW
          </button>
        </div>
      </div>

    </div>
  );
}

export default ReviewList;
