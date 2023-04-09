import React from 'react';
import PropTypes from 'prop-types';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function CartItem({ item }) {
  const totalPrice = currencyFormatter.format(item.count * (
    item.sale_price ? item.sale_price : item.original_price
  ));
  return (
    <div data-testid="cart-item" className="grid grid-flow-row grid-cols-6 grid-rows-3 gap-x-2 mb-4">
      <div className="row-span-1 col-span-6 text-md font-bold">{item.name}</div>
      <div className="row-span-2 col-span-1">
        <img alt="" src={item?.thumbnail_url} className="rounded-md bg-gray-100 h-12 w-12 object-cover" />
      </div>
      <div className="row-span-2 col-span-2 text-xs">
        <div>Style:</div>
        <div>Quantity:</div>
        <div>Total Price:</div>
      </div>
      <div className="row-span-2 col-span-3 text-xs text-right">
        <div>{item.style}</div>
        <div>{item.count}</div>
        <div>{totalPrice}</div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    thumbnail_url: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    sale_price: PropTypes.number.isRequired,
    original_price: PropTypes.number.isRequired,
  }).isRequired,
};
