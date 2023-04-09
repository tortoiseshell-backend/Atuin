import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRelatedProductsAsync,
} from '@reducers/relatedSlice';
import ProductList from './subComponents/ProductList';

function RelatedItems() {
  const dispatch = useDispatch();
  const productID = useSelector((state) => state.product.id);
  const itemsRelated = useSelector((state) => state.related.itemsRelated);
  const itemsOutfit = useSelector((state) => state.related.itemsOutfit);

  useEffect(() => {
    dispatch(getRelatedProductsAsync(productID));
  }, [productID]);

  return (
    <div>
      <div className="text-md font-semibold">RELATED ITEMS</div>
      <ProductList items={itemsRelated} />
      <div className="text-md font-semibold">OUTFITS</div>
      <ProductList items={itemsOutfit} hasPlaceholder />
    </div>
  );
}

export default RelatedItems;
