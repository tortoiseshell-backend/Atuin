import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleViewState } from '@reducers/productSlice';
import defaultImage from '@images/place-holder.jpg';
import checkMobileBrowser from '@lib/checkMobileBrowser';
import checkValidImage from '@lib/checkValidImage';
import checkExpandedView from '../scripts/checkExpandedView';
import zoomPanning from '../scripts/zoomPanning';
import ThumbnailCarousel from './thumbnailCarousel';

const imageGalleryStyle = 'transition-[width] duration-300 relative h-full max-v-screen mx-auto z-20 bg-gray-100 dark:bg-gray-900';

function ImageGallery() {
  const dispatch = useDispatch();
  let isZoomView = false;
  let expandButtonStyle = 'absolute top-2 right-2 z-30 h-7 w-7 rounded-full justify-center items-center bg-white text-black dark:bg-black dark:text-white';

  let photoURL = useSelector((state) => {
    if (state.product.styles.length === 0) return '';
    return state.product.selectedImage[3];
  });
  function viewStateHandler() {
    dispatch(toggleViewState());
  }
  function zoomHandler(event) {
    if (event.type === 'dblclick') {
      isZoomView = !isZoomView;
      document.getElementById('main-image').style.transform = 'scale(2.5)';
    }
    if (event.type === 'mouseleave') {
      isZoomView = false;
    }
    if (isZoomView) {
      if (event.type === 'mousemove') {
        zoomPanning(event);
      }
    } else {
      document.getElementById('main-image').style.transform = '';
    }
  }

  checkExpandedView();
  checkValidImage(photoURL, (isValid) => {
    if (!isValid) { photoURL = defaultImage; }
    if (document.getElementById('app')) {
      document.getElementById('main-image').style.backgroundImage = `url("${photoURL}")`;
    }
  });

  const imageViewer = (
    <div id="main-image-container" className="w-full h-full overflow-hidden">
      <div id="main-image" className="w-full h-full min-h-[530px] bg-no-repeat bg-contain bg-center" data-testid="main-image" onMouseMove={zoomHandler} onMouseLeave={zoomHandler} onDoubleClick={zoomHandler} />
    </div>
  );

  checkMobileBrowser((isMobile) => {
    if (isMobile) {
      expandButtonStyle = 'invisible';
    }
  });

  const expandButton = <button type="button" aria-label="expand image view" className={expandButtonStyle} onClick={viewStateHandler}>+</button>;

  return (
    <div id="image-gallery" className={imageGalleryStyle}>
      {expandButton}
      <ThumbnailCarousel />
      {imageViewer}
    </div>
  );
}

export default ImageGallery;
