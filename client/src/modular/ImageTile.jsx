import React from 'react';
import PropTypes from 'prop-types';

function ImageTile({ photo }) {
  return (
    <img
      className="w-full h-auto object-cover max-w-xs sm:max-w-full"
      src={photo.url}
      key={photo.id}
      alt={photo.id}
    />
  );
}
ImageTile.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageTile;
