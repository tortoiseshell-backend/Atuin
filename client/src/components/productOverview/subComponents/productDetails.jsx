import React from 'react';
import ProductFeature from './productFeature';

const productDetailsStyle = 'standard-grid';

function ProductDetails({ slogan, description, features }) {
  const productFeatures = features.map((feature) => (
    <ProductFeature feature={feature} key={feature.feature} />
  ));

  return (
    <div className={productDetailsStyle}>
      <div className="col-span-1 mx-auto my-10 w-4/5">
        <div className="mb-2 text-md font-bold">{slogan}</div>
        <div className="text-sm">{description}</div>
      </div>
      <div className="col-span-1 w-9/10 mx-4 my-10 px-[10%] border-l-2 border-solid border-l-gray-500">
        {productFeatures}
      </div>
    </div>
  );
}

export default ProductDetails;
