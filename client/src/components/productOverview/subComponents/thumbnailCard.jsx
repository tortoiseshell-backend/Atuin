import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectImage } from '@reducers/productSlice';
import scrollCarousel from '../scripts/scrollCarousel';

function ThumbnailCard({ thumbnail, index }) {
  const dispatch = useDispatch();
  const thumbnailURL = thumbnail[2];
  const selectedImage = useSelector((state) => state.product.selectedImage);

  let thumbnailCardStyle = 'object-cover rounded-md bg-gray-300 h-14 w-14';
  if (selectedImage[2] === thumbnailURL) {
    thumbnailCardStyle += ' image-selected';
    scrollCarousel(index - 3, true);
  }
  const thumbnailRender = <img alt="thumbnail selector" src={thumbnailURL} className={thumbnailCardStyle} />;

  function selectImageHandler() {
    dispatch(selectImage(thumbnail));
  }

  return (
    <div className="snap-always snap-start">
      <button type="button" aria-label={thumbnail[0]} onClick={selectImageHandler}>
        {thumbnailRender}
      </button>
    </div>
  );
}

export default ThumbnailCard;

ThumbnailCard.propTypes = {
  thumbnail: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,
  index: PropTypes.number.isRequired,
};
