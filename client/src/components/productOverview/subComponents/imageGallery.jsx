import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleViewState } from '@reducers/productSlice';
import defaultImage from '@images/place-holder.jpg';
import ThumbnailCarousel from './thumbnailCarousel';
import checkValidImage from '../scripts/checkValidImage';
import checkExpandedView from '../scripts/checkExpandedView';

const imageGalleryStyle = 'transition-[width] duration-300 relative h-full max-v-screen mx-auto z-20 bg-gray-100 border-2 border-black';

function ImageGallery() {
  const dispatch = useDispatch();
  let photoURL = useSelector((state) => {
    if (state.product.styles.length === 0) return '';
    return state.product.selectedImage[3];
  });
  function viewStateHandler() {
    dispatch(toggleViewState());
  }

  checkExpandedView();
  checkValidImage(photoURL, (isValid) => {
    if (!isValid) { photoURL = defaultImage; }
    if (document.getElementById('app')) {
      document.getElementById('main-image').style.backgroundImage = `url("${photoURL}")`;
    }
  });

  const imageViewer = (
    <div id="main-image" className="w-full h-full bg-no-repeat bg-contain bg-center" />
  );
  const expandButton = <button type="button" aria-label="expand image view" className="absolute top-2 right-2 z-30 h-7 w-7 rounded-full justify-center items-center bg-white text-black" onClick={viewStateHandler}>+</button>;

  return (
    <div id="image-gallery" className={imageGalleryStyle}>
      {expandButton}
      <ThumbnailCarousel />
      {imageViewer}
    </div>
  );
}

export default ImageGallery;
