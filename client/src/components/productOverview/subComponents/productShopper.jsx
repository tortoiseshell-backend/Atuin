import React from 'react';

const productShopperStyle = 'grid auto-rows-max';

function ProductShopper() {
  return (
    <div className={productShopperStyle}>
      <div className="row-span-1">
        stars
      </div>
      <div className="row-span-1">
        categories
      </div>
      <div className="row-span-1">
        productName
      </div>
      <div className="row-span-1">
        productPrice
      </div>
      <div className="row-span-1">
        styleSelector
      </div>
      <div className="row-span-1">
        addToCart
      </div>
      <div className="row-span-1">
        socialMedia
      </div>
    </div>
  );
}

export default ProductShopper;
