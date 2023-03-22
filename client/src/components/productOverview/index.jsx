import React, { useState, useEffect } from 'react';
import ProductShopper from './subComponents/productShopper';
import ProductDetails from './subComponents/productDetails';
import getProductDetails from './scripts/getProductDetails';
import ImageGallery from './subComponents/imageGallery';

const productOverviewStyle = 'standard-grid';

function ProductOverview() {
  const [temp, useTemp] = useState({ results: [{ photos: [{ url: '' }] }], features: [] });
  useEffect(() => {
    async function getData() {
      const data = await getProductDetails();
      useTemp(data);
    }
    getData();
  }, []);
  if (temp.id) {
    return (
      <div id="product-overview" className={productOverviewStyle}>
        <div className="row-span-1 col-span-1 bg-gray-100">
          <ImageGallery temp={temp} />
        </div>
        <div className="row-span-1 col-span-1">
          <ProductShopper temp={temp} />
        </div>
        <div className="row-span-1 col-span-2">
          <ProductDetails
            slogan={temp.slogan}
            description={temp.description}
            features={temp.features}
          />
        </div>
      </div>
    );
  }
}

export default ProductOverview;
