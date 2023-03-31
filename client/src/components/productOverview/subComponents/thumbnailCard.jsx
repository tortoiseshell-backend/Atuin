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
  if (selectedImage[0] === thumbnail[0] && selectedImage[1] === thumbnail[1]) {
    thumbnailCardStyle += ' image-selected dark:image-selected-dark';
    scrollCarousel(index - 3, true);
  }

  const thumbnailRender = <img alt="" src={thumbnailURL} className={thumbnailCardStyle} />;

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
