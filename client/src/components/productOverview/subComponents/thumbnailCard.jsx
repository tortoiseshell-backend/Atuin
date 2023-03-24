import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStyle,
} from '@reducers/productSlice';
import defaultImage from '@images/place-holder.jpg';
import checkValidImage from '../scripts/checkValidImage';

function ThumbnailCard({ thumbnail }) {
  const dispatch = useDispatch();
  const thumbnailURL = thumbnail[1];
  // const selectedStyle = useSelector((state) => state.product.selectedStyleID);
  let thumbnailCardStyle = `style-unselected rounded-full bg-[url("${thumbnailURL}")] h-14 w-14`;
  // if (selectedStyle === style.style_id) {
  //   thumbnailImage = 'style-selected rounded-full bg-gray-100 h-14 w-14';
  // }

  function selectImageHandler() {
  }

  return (
    <div>
      <button type="button" aria-label={thumbnail[0]} className={thumbnailCardStyle} onClick={selectImageHandler} />
    </div>
  );
}

export default ThumbnailCard;

// ThumbnailCard.propTypes = {
//   style: PropTypes.shape({
//     style_id: PropTypes.number.isRequired,
//   }).isRequired,
// };
