import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import PlaceholderCard from './placeholderCard';

export default function ProductList({ items }) {
  const itemsList = items;
  let itemsCarousel = <PlaceholderCard />;
  if (itemsList.length > 0) {
    itemsCarousel = itemsList.map((item) => (<ProductCard item={item} key={item.id} />));
  }

  return (
    <div className="p-4 flex flex-row gap-2 w-full overflow-x-auto">
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
