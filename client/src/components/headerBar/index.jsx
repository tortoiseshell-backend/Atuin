import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductListAsync,
  getProductDetailsAsync,
} from '@reducers/productSlice';

function HeaderBar() {
  const dispatch = useDispatch();
  const currentProduct = useSelector((state) => state.product.id);
  const productListData = useSelector((state) => state.product.productList);

  useEffect(() => {
    dispatch(getProductListAsync());
  }, []);

  function productChangeHandler(event) {
    dispatch(getProductDetailsAsync(event.target.value));
  }

  const productSelector = (
    <div className="pt-2 pb-2">
      <select name="productSelector" id="product-selector" className="w-64 p-2 standard-border text-lg font-semibold text-secondary-300 hover:bg-secondary-300/5" defaultValue={currentProduct} onChange={productChangeHandler}>
        {productListData.map((product) => (
          <option value={product.id} key={product.id}>{product.name}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="header-bar">
      {productSelector}
    </div>
  );
}

export default HeaderBar;
