import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectStyle, selectImage } from '@reducers/productSlice';

function StyleSelector({ style }) {
  const dispatch = useDispatch();
  const selectedStyle = useSelector((state) => state.product.selectedStyleID);
  const thumbnailURL = style.photos[0].thumbnail_url;
  let styleSelectorStyle = 'style-unselected rounded-full bg-gray-100 h-14 w-14 object-cover';
  let selectedMarker = 'invisible';

  if (selectedStyle === style.style_id) {
    styleSelectorStyle = 'style-selected rounded-full bg-gray-100 h-14 w-14 object-cover';
    selectedMarker = 'style-selected visible absolute top-0 right-0 rounded-full bg-secondary-300 h-4 w-4 z-10';
  }

  function selectStyleHandler() {
    dispatch(selectStyle(style.style_id));
    dispatch(selectImage([
      style.style_id,
      0,
      style.photos[0].thumbnail_url,
      style.photos[0].url,
    ]));
  }

  const thumbnailRender = <img alt="thumbnail selector" src={thumbnailURL} className={styleSelectorStyle} />;

  return (
    <div>
      <button type="button" aria-label={style.style_id} className="relative" onClick={selectStyleHandler}>
        {thumbnailRender}
        <div className={selectedMarker}><i className="relative -top-2 fa fa-solid fa-check text-white text-xs font-bold" /></div>
      </button>
    </div>
  );
}

export default StyleSelector;

StyleSelector.propTypes = {
  style: PropTypes.shape({
    style_id: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail_url: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};
