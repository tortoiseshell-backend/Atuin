import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStyle,
} from '@reducers/productSlice';

function StyleSelector({ style }) {
  const dispatch = useDispatch();
  const selectedStyle = useSelector((state) => state.product.selectedStyleID);
  let styleSelectorStyle = 'relative style-unselected rounded-full bg-gray-100 h-14 w-14';
  let selectedMarker = 'invisible';
  if (selectedStyle === style.style_id) {
    styleSelectorStyle = 'relative style-selected rounded-full bg-gray-100 h-14 w-14';
    selectedMarker = 'style-selected visible absolute -top-1 -right-1 rounded-full bg-secondary-300 h-4 w-4 z-10';
  }

  function selectStyleHandler() {
    dispatch(selectStyle(style.style_id));
  }

  return (
    <div>
      <button type="button" aria-label={style.style_id} className={styleSelectorStyle} onClick={selectStyleHandler}>
        <div className={selectedMarker}><i className="relative -top-2 fa fa-solid fa-check text-white text-xs font-bold" /></div>
      </button>
    </div>
  );
}

export default StyleSelector;

StyleSelector.propTypes = {
  style: PropTypes.shape({
    style_id: PropTypes.number.isRequired,
  }).isRequired,
};
