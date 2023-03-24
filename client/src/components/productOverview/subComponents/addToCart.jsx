import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleFavorite,
  selectSize,
} from '@reducers/productSlice';

const addToCartStyle = 'grid grid-rows-2';

function AddToCart() {
  const dispatch = useDispatch();
  const isFavorited = useSelector((state) => state.product.isFavorited);
  const styles = useSelector((state) => state.product.styles);
  const selectedStyleID = useSelector((state) => state.product.selectedStyleID);
  const selectedSKU = useSelector((state) => state.product.selectedSKU);
  const selectedStyle = styles.find((style) => style.style_id === selectedStyleID);

  let listSKUs = [];
  let sizeArray = [];
  if (selectedStyle) {
    listSKUs = Object.keys(selectedStyle.skus);
    sizeArray = Array.from({ length: selectedStyle.skus[selectedSKU].quantity }, (_, i) => i + 1);
  }

  function sizeChangeHandler(event) {
    dispatch(selectSize(event.target.value));
  }
  function favoriteHandler() {
    dispatch(toggleFavorite());
  }

  let favoriteIcon = 'text-md text-left font-semibold text-secondary-300';
  let favoriteButton = 'w-full h-14 p-2 px-3 standard-border flex justify-center items-center bg-white hover:bg-secondary-300/5';
  if (isFavorited) {
    favoriteIcon = 'text-md text-left font-semibold text-white';
    favoriteButton = 'w-full h-14 p-2 px-3 standard-border flex justify-center items-center bg-secondary-300 hover:bg-secondary-300/95';
  }

  const sizeSelector = (
    <div className="col-span-1 pt-2 pb-2">
      <select name="productSizes" id="productSizes" className="w-full h-14 p-2 standard-border text-sm font-semibold text-secondary-300 hover:bg-secondary-300/5" value={selectedSKU} onChange={sizeChangeHandler}>
        {listSKUs.map((indivSKU) => (
          <option value={indivSKU} key={indivSKU}>{selectedStyle.skus[indivSKU].size}</option>
        ))}
      </select>
    </div>
  );

  const quantitySelector = (
    <div className="col-span-1 pt-2 pb-2">
      <select name="productQuantities" id="productQuantities" className="w-full h-14 p-2 standard-border text-sm font-semibold text-secondary-300 hover:bg-secondary-300/5">
        {sizeArray.map((quantity) => (
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
          <button type="button" className="w-full h-14 p-2 px-3 standard-border flex justify-between items-center bg-secondary-300 hover:bg-secondary-300/95">
            <span className="text-sm text-left font-semibold text-white">ADD TO CART</span>
            <span className="text-sm text-left font-semibold text-white">+</span>
          </button>
        </div>
        <div className="col-span-1 pt-2 pb-2">
          <button type="button" className={favoriteButton} onClick={favoriteHandler}>
            <span className={favoriteIcon}>&#9734;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
