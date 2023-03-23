import React from 'react';
import PropTypes from 'prop-types';
import StarRatingView from '@modular/StarRatingView';

function ReviewListTile({ review }) {
  const date = new Date(review.date);
  const outputDateString = (new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })).format(date).replace(/\d+/, date.getDate().toString().padStart(2, '0'));

  return (
    <div data-testid="tile" className="flex-col w-full">
      ~-ReviewListTile-~
      <div className="w-full max-w-lg overflow-x-auto">
        {'Summary, 60 chars: '}
        {review.summary}
        <div className="flex flex-row flex-wrap">

          <StarRatingView averageRating={review.rating} />
          <div className="flex items-center">
            {outputDateString}
          </div>
        </div>
        <div className="w-full break-words">
          {'Body, 250 chars: '}
          {review.body}
        </div>
        <div className="flex flex-row flex-wrap">
          {review.photos.map((photo) => <img className="w-1/6 h-auto p-1" src={photo.url} key={photo.id} alt={photo.id} />)}
        </div>
        <div>
          {review.response !== null ? (
            <div>
              {'Response from seller: '}
              {review.response}
            </div>
          )
            : null}
        </div>
        <div>
          {'User: '}
          {review.reviewer_name}
          {'\t\tverified?'}
        </div>
        <div>
          {review.recommend ? (
            <div className="text-green-600">
              I recommend this product
            </div>
          )
            : null}
        </div>
        <div>
          {review.helpfulness}
          {'\tusers found this helpful'}
        </div>
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
