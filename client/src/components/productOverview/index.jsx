import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductDetailsAsync,
} from '@reducers/productSlice';

import ProductShopper from './subComponents/productShopper';
import ProductDetails from './subComponents/productDetails';
import ImageGallery from './subComponents/imageGallery';

const productOverviewStyle = 'standard-grid';

function ProductOverview() {
  const dispatch = useDispatch();
  const productID = useSelector((state) => state.product.id);
  // console.log(useSelector((state) => state.product));

  useEffect(() => {
    dispatch(getProductDetailsAsync(productID));
  }, [productID]);

  return (
    <div className={productOverviewStyle}>
      <div id="gallery-container" className="row-span-1 col-span-1 bg-gray-100">
        <ImageGallery />
      </div>
      <div className="row-span-1 col-span-1">
        <ProductShopper />
      </div>
      <div className="row-span-1 col-span-2">
        <ProductDetails />
      </div>
    </div>
  );
}

export default ProductOverview;
