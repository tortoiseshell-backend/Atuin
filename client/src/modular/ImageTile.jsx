import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ImageTile({ photo }) {
  const rendered = useSelector((state) => state.modal.modalOpen);
  const imageRef = useRef(null);

  useEffect(() => {
    const zoomScreen = document.querySelector('#zoomable');
    let zoom = 1;
    const zoomingSpeed = 0.1;
    document.addEventListener('wheel', (e) => {
      if (e.deltaY > 0) {
        zoomScreen.style.transform = `scale(${(zoom -= zoomingSpeed)})`;
      } else {
        zoomScreen.style.transform = `scale(${(zoom += zoomingSpeed)})`;
      }
    });
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let x = 0;
    let y = 0;

    const handleMouseDown = (e) => {
      e.preventDefault();
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseMove = (e) => {
      e.preventDefault();
      if (isDragging) {
        x = x + e.clientX - lastX;
        y = y + e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        imageRef.current.style.transform = `translate(${x / 2}px, ${y / 2}px)`;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    zoomScreen.addEventListener('mousedown', handleMouseDown);
    zoomScreen.addEventListener('mousemove', handleMouseMove);
    zoomScreen.addEventListener('mouseup', handleMouseUp);

    return () => {
      zoomScreen.removeEventListener('mousedown', handleMouseDown);
      zoomScreen.removeEventListener('mousemove', handleMouseMove);
      zoomScreen.removeEventListener('mouseup', handleMouseUp);
    };
  }, [rendered]);

  return (
    <div
      id="zoomable"
      style={{
        maxHeight: 'calc(95vh + 50px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <img
        ref={imageRef}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
        src={photo.url}
        alt={photo.id}
      />
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
