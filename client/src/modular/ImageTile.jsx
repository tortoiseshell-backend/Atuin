import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

function ImageTile({ photo }) {
  const [zoomValue, setZoomValue] = useState(1);
  const [panValue, setPanValue] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleZoom = (event) => {
    const zoomDelta = event.deltaY > 0 ? -0.1 : 0.1;
    setZoomValue(Math.max(0.1, Math.min(3, zoomValue + zoomDelta)));
  };

  const handlePanStart = (event) => {
    event.preventDefault();
    const startX = event.clientX || event.touches[0].clientX;
    const startY = event.clientY || event.touches[0].clientY;
    const currentPanValue = { x: panValue.x, y: panValue.y };
    const handleMouseMove = (e) => {
      const newX = e.clientX || e.touches[0].clientX;
      const newY = e.clientY || e.touches[0].clientY;
      const deltaX = newX - startX;
      const deltaY = newY - startY;
      const img = imgRef.current;
      const imgWidth = img.offsetWidth * zoomValue;
      const imgHeight = img.offsetHeight * zoomValue;
      const containerWidth = img.parentNode.offsetWidth;
      const containerHeight = img.parentNode.offsetHeight;
      const minX = (containerWidth - imgWidth) / 2;
      const maxX = containerWidth / 2;
      const minY = (containerHeight - imgHeight) / 2;
      const maxY = containerHeight / 2;
      const newPanX = Math.min(Math.max(currentPanValue.x + deltaX, -maxX), -minX);
      const newPanY = Math.min(Math.max(currentPanValue.y + deltaY, -maxY), -minY);
      setPanValue({
        x: newPanX,
        y: newPanY,
      });
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp, { passive: false });
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp, { passive: false });
  };

  return (
    <div
      style={{
        maxHeight: 'calc(95vh + 50px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <button
        type="button"
        onWheel={handleZoom}
        onMouseDown={handlePanStart}
        onTouchStart={handlePanStart}
      >
        <img
          ref={imgRef}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transform: `translate(${panValue.x}px, ${panValue.y}px) scale(${zoomValue})`,
            transition: 'transform 0.1s ease-out',
            cursor: 'grab',
          }}
          src={photo.url}
          alt={photo.id}
        />
      </button>
    </div>
  );
}

ImageTile.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageTile;
