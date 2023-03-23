import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleViewState,
} from '@reducers/productSlice';
import defaultImage from '@images/place-holder.jpg';
import checkValidImage from '../scripts/checkValidImage';

function ImageGallery() {
  const dispatch = useDispatch();
  const isExpandedView = useSelector((state) => state.product.isExpandedView);
  let photoURL = useSelector((state) => {
    if (state.product.styles.length === 0) return '';
    return state.product.styles[0].photos[0].url;
  });

  useEffect(() => {
    checkValidImage(photoURL, (isValid) => {
      if (!isValid) { photoURL = defaultImage; }
      if (document.getElementById('app')) {
        document.getElementById('main-image').style.backgroundImage = `url("${photoURL}")`;
      }
    });
  }, [photoURL]);

  function viewStateHandler() {
    dispatch(toggleViewState());
  }

  let imageGalleryStyle = 'transition-[width] duration-300 relative w-full h-full max-v-screen mx-auto z-10 bg-gray-100';
  if (isExpandedView) {
    const expandedWidth = document.getElementById('app').clientWidth;
    imageGalleryStyle = `transition-[width] duration-300 relative w-[${expandedWidth}px] h-full max-v-screen mx-auto z-10 bg-gray-100`;
  }

  const imageViewer = (
    <div id="main-image" className="w-full h-full bg-no-repeat bg-contain bg-center" />
  );
  const expandButton = <button type="button" aria-label="expand image view" className="absolute top-2 right-2 z-20 h-7 w-7 rounded-full justify-center items-center bg-white text-black" onClick={viewStateHandler}>+</button>;

  return (
    <div className={imageGalleryStyle}>
      {expandButton}
      {imageViewer}
    </div>
  );
}

export default ImageGallery;
