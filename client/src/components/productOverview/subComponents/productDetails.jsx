import React from 'react';

const productDetailsStyle = 'grid grid-cols-3';

function ProductDetails() {
  return (
    <div className={productDetailsStyle}>
      <div className="col-span-2">
        ProductDescription
      </div>
      <div className="col-span-1">
        ProductFeatures
      </div>
    </div>
  );
}

export default ProductDetails;
