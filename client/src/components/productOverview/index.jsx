import React from 'react';
import ProductShopper from './subComponents/productShopper';
import ProductDetails from './subComponents/productDetails';
import pullProductDetails from './scripts/productAPI';

const productOverviewStyle = 'grid grid-cols-3 auto-rows-max';

function ProductOverview() {
  return (
    <div className={productOverviewStyle}>
      <div className="row-span-1 col-span-2">
        subComponent
        <input type="button" onClick={pullProductDetails} value="API" />
      </div>
      <div className="row-span-1 col-span-1">
        <ProductShopper />
      </div>
      <div className="row-span-1 col-span-3">
        <ProductDetails />
      </div>
    </div>
  );
}

export default ProductOverview;
