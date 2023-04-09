import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import PlaceholderCard from './placeholderCard';

export default function ProductList({ items, hasPlaceholder }) {
  const productID = useSelector((state) => state.product.id);
  const itemsList = items;
  let currentProductExists = false;

  let itemsCarousel = [];
  if (itemsList.length > 0) {
    itemsCarousel = itemsList.map((i) => {
      const item = { ...i };
      if (productID === item.id) {
        currentProductExists = true;
      }
      item.default_price = Number(item.default_price);
      return <ProductCard item={item} key={item.id} />;
    });
  }

  if (hasPlaceholder && !currentProductExists) {
    itemsCarousel.push(<PlaceholderCard key="placeholder" />);
  }

  return (
    <div className="p-4 flex flex-row gap-2 w-full overflow-x-scroll scrollbar-hide">
      {itemsCarousel}
    </div>
  );
}

ProductList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
