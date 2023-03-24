import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleViewState,
} from '@reducers/productSlice';
import ThumbnailCard from './thumbnailCard';

const thumbnailCarouselStyle = 'absolute w-16 h-full overflow-y-auto top-6 left-6 border-2';

function ThumbnailCarousel() {
  // const dispatch = useDispatch();
  let thumbnailList = [];
  useSelector((state) => state.product.styles).forEach((style) => {
    thumbnailList = thumbnailList.concat(style.photos
      .map((photo) => [style.style_id, photo.thumbnail_url]));
  });

  const thumbnailCards = thumbnailList.map((thumbnail) => {
    return <ThumbnailCard thumbnail={thumbnail} key={thumbnail[1]} />;
  });
  return (
    <div className={thumbnailCarouselStyle}>
      <button type="button" aria-label="scroll up">up</button>
      {thumbnailCards}
      <button type="button" aria-label="scroll up">down</button>
    </div>
  );
}

export default ThumbnailCarousel;
