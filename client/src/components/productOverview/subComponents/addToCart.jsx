import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectSize } from '@reducers/productSlice';
import { addCartItem, getCartDataAsync } from '@reducers/cartSlice';
import { renderCart, hideCart } from '@lib/cartRender';

const addToCartStyle = 'grid grid-rows-2';

function AddToCart() {
  const dispatch = useDispatch();
  const productID = useSelector((state) => state.product.id);
  const isFavorited = useSelector((state) => state.product.isFavorited);
  const styles = useSelector((state) => state.product.styles);
  const selectedStyleID = useSelector((state) => state.product.selectedStyleID);
  const selectedSKU = useSelector((state) => state.product.selectedSKU);
  const selectedStyle = styles.find((style) => style.style_id === selectedStyleID);

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  let favoriteIcon = 'text-md text-left font-semibold';
  let favoriteButton = 'w-full h-14 p-2 px-3 flex justify-center items-center';
  let productSizesStyles = 'w-full h-14 p-2 text-sm font-semibold';
  let quantitySelectorStyle = 'w-full h-14 p-2 text-sm font-semibold';
  let addToCartButtonStyle = 'w-full h-14 p-2 px-3 flex justify-between items-center';
  if (isDarkTheme) {
    productSizesStyles += ' bg-black text-primary-300 hover:bg-primary-300/5 standard-border-dark';
    quantitySelectorStyle += ' bg-black text-primary-300 hover:bg-primary-300/5 standard-border-dark';
    addToCartButtonStyle += ' bg-primary-300 hover:bg-primary-300/95 text-black standard-border-dark';
    if (isFavorited) {
      favoriteIcon += ' text-gray-700';
      favoriteButton += ' bg-primary-300 hover:bg-primary-300/95 standard-border-dark';
    } else {
      favoriteIcon += ' text-primary-300';
      favoriteButton += ' bg-black hover:bg-primary-300/5 standard-border-dark';
    }
  } else {
    productSizesStyles += ' bg-white text-secondary-300 hover:bg-secondary-300/5 standard-border';
    quantitySelectorStyle += ' bg-white text-secondary-300 hover:bg-secondary-300/5 standard-border';
    addToCartButtonStyle += ' bg-secondary-300 hover:bg-secondary-300/95 text-white standard-border';
    if (isFavorited) {
      favoriteIcon += ' text-gray-300';
      favoriteButton += ' bg-secondary-300 hover:bg-secondary-300/95 standard-border';
    } else {
      favoriteIcon += ' text-secondary-300';
      favoriteButton += ' bg-white hover:bg-secondary-300/5 standard-border';
    }
  }

  let listSKUs = [];
  let sizeArray = [];
  if (selectedStyle) {
    listSKUs = Object.keys(selectedStyle.skus);
    sizeArray = Array.from({ length: selectedStyle.skus[selectedSKU].quantity }, (_, i) => i + 1);
  }

  function sizeChangeHandler(event) {
    dispatch(selectSize(event.target.value));
  }
  function addToCartHandler() {
    const quantity = Number(document.getElementById('productQuantities').value);
    dispatch(addCartItem(productID, Number(selectedSKU), quantity));
    dispatch(getCartDataAsync());
    renderCart();
    setTimeout(hideCart, 3000);
  }
  function favoriteHandler() {
    dispatch(toggleFavorite());
  }

  const sizeSelector = (
    <div className="col-span-1 pt-2 pb-2">
      <label htmlFor="productSizes">
        <span className="text-xs font-semibold">SIZE:</span>
        <select name="productSizes" id="productSizes" className={productSizesStyles} value={selectedSKU} onChange={sizeChangeHandler}>
          {listSKUs.map((indivSKU) => (
            <option value={indivSKU} key={indivSKU}>{selectedStyle.skus[indivSKU].size}</option>
          ))}
        </select>
      </label>
    </div>
  );

  const quantitySelector = (
    <div className="col-span-1 pt-2 pb-2">
      <label htmlFor="productQuantities">
        <span className="text-xs font-semibold">QUANTITY:</span>
        <select name="productQuantities" id="productQuantities" className={quantitySelectorStyle}>
          {sizeArray.map((quantity) => (
            <option value={quantity} key={quantity}>{quantity}</option>
          ))}
        </select>
      </label>
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
          <button type="button" className={addToCartButtonStyle} onClick={addToCartHandler}>
            <span className="text-sm text-left font-semibold">ADD TO CART</span>
            <span className="text-sm text-left font-semibold">+</span>
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
