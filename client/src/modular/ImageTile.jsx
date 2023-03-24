import React from 'react';
import PropTypes from 'prop-types';

function ImageTile({ photo }) {
  return (
    <div style={{
      maxHeight: 'calc(95vh + 50px)', display: 'flex', justifyContent: 'baseline', alignItems: 'center', height: '100%',
    }}
    >
      <img
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        src={photo.url}
        key={photo.id}
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
