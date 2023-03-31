import React from 'react';
import { useSelector } from 'react-redux';
import RelatedProductCard from './relatedProductCard';

export default function RelatedProductList() {
  const itemsRelated = useSelector((state) => state.related.itemsRelated)
    .map((item) => (<RelatedProductCard item={item} key={item.id} />));

  return (
    <div className="p-4 grid grid-flow-col gap-2 w-full overflow-x-auto">
      {itemsRelated}
    </div>
  );
}
