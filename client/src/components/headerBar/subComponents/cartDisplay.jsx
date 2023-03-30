import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './cartItem';

export default function CartDisplay() {
  const cartData = useSelector((state) => state.cart.items);
  const allProductData = useSelector((state) => state.cart.itemInfo);

  const cartList = cartData.map((i) => {
    const item = { ...i, ...allProductData[i.sku_id] };
    item.count = Number(item.count);
    item.original_price = Number(item.original_price);
    item.sale_price = Number(item.sale_price);
    if (allProductData[i.sku_id]) {
      return <CartItem item={item} key={item.sku_id} />;
    }
    return null;
  });

  return (
    <div id="cart-list" data-testid="cart-list" className="collapse transition-[max-height] duration-500 absolute top-13 right-4 w-72 bg-white shadow-lg p-4 overflow-y-auto">
      <div className="text-md font-bold">SHOPPING CART</div>
      <div className="p-4">
        {cartList}
      </div>
    </div>
  );
}
