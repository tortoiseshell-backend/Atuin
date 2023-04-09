/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggle, setModalProps, setModalType } from '@reducers/modalSlice';
import { getReviewsAsync } from '@reducers/reviewSlice';
import PropTypes from 'prop-types';
import StarRatingView from '@modular/StarRatingView';
import markAsHelpful from '../scripts/API_Helper';
import DOMPurify from 'dompurify';

function ReviewListTile({ review }) {
  const dispatch = useDispatch();
  const toggleModal = (photo) => {
    dispatch(setModalProps({ photo }));
    dispatch(setModalType('ImageTile'));
    dispatch(toggle());
  };
  const date = new Date(review.date);
  const outputDateString = (new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })).format(date).replace(/\d+/, date.getDate().toString().padStart(2, '0'));
  const [showFullReview, setShowFullReview] = useState(false);
  const [showFullResponse, setShowFullResponse] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState(null);

  const handleLikeClick = () => {
    setHelpfulClicked('like');
    if (helpfulClicked === null) {
      markAsHelpful(review.review_id);
      dispatch(getReviewsAsync());
    }
  };

  const handleDislikeClick = () => {
    setHelpfulClicked('dislike');
  };

  const sanitize = (text) => {
    text = String(text);
    return DOMPurify.sanitize(text);
  };

  return (
    <div
      data-testid="tile"
      className="flex-col w-full bg-white dark:bg-stone-950 p-4"
      style={{
        margin: '0.25em',
        border: '1px solid grey',
        boxShadow: '1px 1px 3px rgb(40, 11, 135, 0.4)',
      }}
    >

      <div className="flex flex-col w-full max-w-lg overflow-x-auto h-full">
        <div id="summary" className="font-bold w-full break-words overflow-hidden text-overflow-ellipsis white-space-nowrap">
          {review.summary.slice(0, 60)}
        </div>

        <div className="flex flex-row flex-wrap">
          <StarRatingView averageRating={review.rating} />
          <div
            style={{
              margin: ' 0 0 0 0.5em',
            }}
            className="flex items-center"
          >
            {outputDateString}
          </div>
        </div>

        {review.recommend ? (
          <div className="text-green-600 mb-1 text-xs">
            <i className="far fa-check-circle text-[#2caf53]" />
            <span className="ml-2">I recommend this product</span>
          </div>
        )
          : null}
      </div>

      <div id="reviewBody" className="w-full break-words overflow-hidden text-overflow-ellipsis white-space-nowrap text-sm">
        {review.body.length <= 250 ? review.body : (showFullReview ? sanitize(review.body) : `${sanitize(review.body.slice(0, 250))}... `)}
        {review.body.length > 250 && (
          <span
            role="button"
            tabIndex={0}
            className="text-blue-500 cursor-pointer"
            onClick={() => setShowFullReview(!showFullReview)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                setShowFullReview(!showFullReview);
              }
            }}
          >
            {showFullReview ? '  Show less' : 'Show more'}
          </span>
        )}
      </div>

      <div id="user" className="text-xs mt-2 text-[#615e6e]">
        {'Submitted by: '}
        {sanitize(review.reviewer_name)}
      </div>

      <div data-testid="notAnything" id="photos" className="grid grid-cols-5 gap-2 my-2">
        {review.photos.map((photo, idx) => (
          <button
            data-testid="notAnything1"
            id="photo"
            // eslint-disable-next-line react/no-array-index-key
            key={`${review.review_id}-${sanitize(photo.id)}-${idx}`}
            type="button"
            onClick={() => toggleModal(photo)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                toggleModal(photo);
              }
            }}
            style={{ flexGrow: 1 }}
          >
            <div className="relative max-h-75px" style={{ paddingBottom: '100%' }}>
              <img className="absolute top-0 left-0 w-full h-full object-cover" src={photo.url} alt={`Review ${sanitize(photo.id)}`} />
            </div>
          </button>
        ))}
      </div>

      <div id="recommend" className="flex text-xs">
        <div
          style={{
            margin: '0 0.5em 0 0',
          }}
        >
          {review.response !== null ? (
            <div
              style={{
                margin: '0 0.5em 0 0',
              }}
            >
              {review.response !== null ? (
                <div
                  id="response"
                  className="break-words overflow-hidden text-overflow-ellipsis white-space-nowrap rounded-md border border-solid border-secondary-200 text-sm"
                  style={{
                    margin: '10px',
                    padding: '10px',
                    display: 'inline-block',
                    maxWidth: '100%',
                  }}
                >
                  {'Response from seller: '}
                  {review.response.length <= 100 ? sanitize(review.response) : (showFullResponse ? sanitize(review.response) : `${sanitize(review.response.slice(0, 100))}... `)}
                  {(review.response.length > 100) && (
                    <span
                      role="button"
                      tabIndex={0}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setShowFullResponse(!showFullResponse)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          setShowFullResponse(!showFullResponse);
                        }
                      }}
                    >
                      {showFullResponse ? '  Show less' : 'Show more'}
                    </span>
                  )}
                </div>
              )
                : null}
            </div>

          ) : null}
        </div>
      </div>

      <div id="helpful" className="grid grid-rows justify-center items-center">
        <div className="font-semibold text-xs">
          Was this review helpful?
        </div>
        <div
          id="helpfulButts"
          className="flex justify-center gap-8 mt-2"
        >
          {helpfulClicked !== 'like' && (
            <i
              className="fa fa-duotone fa-thumbs-up fa-rotate-180 text-[#300e7f] dark:text-secondary-300"
              aria-label="dislike button"
              style={{
                opacity: '0.8',
                cursor: 'pointer',
                fontSize: '1.5em',
                padding: '3px',
                paddingBottom: '8px',
              }}
              onClick={handleDislikeClick}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handleDislikeClick();
                }
              }}
              onMouseEnter={(e) => {
                if (helpfulClicked === null) {
                  e.target.style.textShadow = '0 0 1px #ff5733, 0 0 4px #300e7f, 0 0 6px #6120d8';
                } else {
                  e.target.style.cursor = 'not-allowed';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.textShadow = '';
                e.target.style.cursor = 'auto';
              }}
            />
          )}
          {helpfulClicked !== 'dislike' && (
            <i
              className="fa fa-duotone fa-thumbs-up  text-[#300e7f] dark:text-secondary-300"
              aria-label="like button"
              style={{
                opacity: '0.8',
                cursor: 'pointer',
                fontSize: '1.5em',
                padding: '3px',
              }}
              onClick={handleLikeClick}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handleLikeClick();
                }
              }}
              onMouseEnter={(e) => {
                if (helpfulClicked === null) {
                  e.target.style.textShadow = '0 0 1px #a4d8ff, 0 0 4px #300e7f, 0 0 6px #6120d8';
                } else {
                  e.target.style.cursor = 'not-allowed';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.textShadow = '';
                e.target.style.cursor = 'auto';
              }}
            />
          )}
        </div>
        <span className="mt-2 text-xs">
          {review.helpfulness}
          {'\tusers found this helpful'}
        </span>
      </div>
    </div>
  );
}
ReviewListTile.propTypes = {
  review: PropTypes.shape({
    review_id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
    recommend: PropTypes.bool.isRequired,
    response: PropTypes.string,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    reviewer_name: PropTypes.string.isRequired,
    helpfulness: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default ReviewListTile;
