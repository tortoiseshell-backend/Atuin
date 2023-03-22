import React from 'react';

const productFeaturesStyle = 'grid grid-cols-2 text-sm mb-2';

function ProductFeatures({ feature }) {
  feature.value = feature.value || '';

  return (
    <div className={productFeaturesStyle}>
      <div className="row-span-1 font-semibold">{`${feature.feature}`}</div>
      <div className="row-span-1">{`${feature.value}`}</div>
    </div>
  );
}

export default ProductFeatures;
