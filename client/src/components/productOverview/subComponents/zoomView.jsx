import React from 'react';

const zoomViewStyle = 'transition-[width] duration-300 relative h-full max-v-screen mx-auto z-20 bg-gray-100 border-2 border-black';

function ZoomView() {
  const imageViewer = (
    <div id="main-image" className="w-full h-full bg-no-repeat bg-contain bg-center" />
  );

  return (
    <div className={zoomViewStyle}>
      {imageViewer}
    </div>
  );
}

export default ZoomView;
