import React, { useState, useEffect } from 'react';
import imageErrorHandler from '../scripts/imageErrorHandler';

let imageGalleryStyle = 'transition-[width] duration-300 relative h-full mx-auto z-10 bg-gray-100';

function ImageGallery({ temp }) {
  const [viewState, setViewState] = useState('standard');
  function toggleViewState() {
    if (viewState === 'standard') {
      setViewState('expanded');
      return;
    }
    setViewState('standard');
  }

  useEffect(() => {
    if (viewState === 'expanded') {
      if (document.getElementById('product-overview')) {
        const expandedWidth = document.getElementById('product-overview').clientWidth;
        imageGalleryStyle = `transition-[width] duration-300 relative w-[${expandedWidth}px] h-full mx-auto z-10 bg-gray-100`;
        console.log(viewState);
        return;
      }
    }
    console.log(viewState);
    imageGalleryStyle = 'transition-[width] duration-300 relative w-full h-full mx-auto z-10 bg-gray-100';
  }, [viewState]);

  const photoURL = temp.results[2].photos[0].url;
  const imageViewer = <img src={photoURL} alt="" className="w-full max-w-[600px] mx-auto" onError={(e) => imageErrorHandler(e)} />;
  const expandButton = <button type="button" aria-label="expand" className="absolute top-2 right-2 z-20 h-7 w-7 rounded-full justify-center items-center bg-white text-black" onClick={toggleViewState}>+</button>;

  return (
    <div className={imageGalleryStyle}>
      {expandButton}
      {imageViewer}
    </div>
  );
}

export default ImageGallery;
