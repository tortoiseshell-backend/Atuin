import React from 'react';
import PropTypes from 'prop-types';

const productFeaturesStyle = 'grid grid-cols-2 text-sm mb-2';

function ProductFeatures({ feature }) {
  const featureValue = feature.value || '';

  console.log(JSON.stringify(feature, null, 2))
  return (
    <div className={productFeaturesStyle}>
      <div className="row-span-1 font-semibold">{`${feature.feature}`}</div>
      <div className="row-span-1">{`${featureValue}`}</div>
    </div>
  );
}

export default ProductFeatures;

ProductFeatures.propTypes = {
  feature: PropTypes.shape({
    feature: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
};
