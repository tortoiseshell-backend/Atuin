import React from 'react';

const addToCartStyle = 'grid grid-rows-2';

function AddToCart() {
  const sizeSelector = (
    <div className="col-span-1 pt-2 pb-2">
      <select name="productSizes" id="productSizes" className="w-full h-14 p-2 standard-border text-sm font-semibold text-secondary-300">
        {['SMALL', 'MEDIUM', 'LARGE'].map((size) => (
          <option value={size} key={size}>{size}</option>
        ))}
      </select>
    </div>
  );

  const quantitySelector = (
    <div className="col-span-1 pt-2 pb-2">
      <select name="productQuantities" id="productQuantities" className="w-full h-14 p-2 standard-border text-sm font-semibold text-secondary-300">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
          <option value={quantity} key={quantity}>{quantity}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className={addToCartStyle}>
      <div className="row-span-1 grid grid-cols-[1fr_7rem] gap-4">
        {sizeSelector}
        {quantitySelector}
      </div>
      <div className="col-span-1 grid grid-cols-[1fr_3.5rem] gap-4">
        <div className="col-span-1 pt-2 pb-2">
          <button type="button" className="w-full h-14 p-2 px-3 standard-border flex justify-between items-center bg-secondary-300">
            <span className="text-sm text-left font-semibold text-white">ADD TO CART</span>
            <span className="text-sm text-left font-semibold text-white">+</span>
          </button>
        </div>
        <div className="col-span-1 pt-2 pb-2">
          <button type="button" className="w-full h-14 p-2 px-3 standard-border flex justify-center items-center">
            <span className="text-md text-left font-semibold text-secondary-300">&#9734;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
