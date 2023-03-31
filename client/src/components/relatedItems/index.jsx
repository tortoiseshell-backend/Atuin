import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRelatedProductsAsync,
} from '@reducers/relatedSlice';
import RelatedProductList from './subComponents/relatedProductList';

function RelatedItems() {
  const dispatch = useDispatch();
  const productID = useSelector((state) => state.product.id);

  useEffect(() => {
    dispatch(getRelatedProductsAsync(productID));
  }, [productID]);

  return (
    <div className="mx-auto p-10 w-full max-w-[950px] ">
      <div className="text-md font-semibold">RELATED ITEMS</div>
      <RelatedProductList />
    </div>
  );
}

export default RelatedItems;
