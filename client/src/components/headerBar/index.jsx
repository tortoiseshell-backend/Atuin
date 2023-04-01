import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductListAsync,
  getProductDetailsAsync,
} from '@reducers/productSlice';
import {
  getCartDataAsync,
  initializeProductData,
} from '@reducers/cartSlice';
import {
  toggleTheme,
} from '@reducers/themeSlice';
import { renderCart, hideCart } from '@lib/cartRender';
import logoImage from '@images/ADIDA_logo_white.png';
import CartDisplay from './subComponents/cartDisplay';

function HeaderBar() {
  const dispatch = useDispatch();
  const productListData = useSelector((state) => state.product.productList);
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  useEffect(() => {
    dispatch(getProductListAsync());
    dispatch(initializeProductData());
    dispatch(getCartDataAsync());
    hideCart();
  }, []);

  function productChangeHandler(event) {
    dispatch(getProductDetailsAsync(event.target.value));
  }

  function renderProductList() {
    const productList = productListData.map((product) => (
      <option value={product.id} key={product.id} data-testid="product-dropdown" className="dark:bg-black">{product.name}</option>
    ));
    productList.unshift(
      <option value="none" key="none" className=" bg-stone-200 dark:bg-black" disabled>
        you can use axios
      </option>,
    );
    return productList;
  }

  const productSelector = (
    <div className="max-w-[80%]">
      <select name="productSelector" id="product-selector" data-testid="product-selector" className="w-full p-2 border-b-2 border-white bg-transparent text-lg text-white text-clip" defaultValue="none" onChange={productChangeHandler}>
        {renderProductList()}
      </select>
    </div>
  );

  return (
    <div id="header-bar" data-testid="header-bar">
      <div className="header-bar fixed w-full max-w-[950px] z-40 overflow-visible">
        <div className="header-bar bg-gradient-to-r from-primary-300 to-secondary-300 flex justify-between p-2 pl-4 gap-x-4">
          <div className="my-auto max-w-[40%]">
            <img alt="logo" src={logoImage} className="max-h-8 aspect-auto" />
          </div>

          <div className="max-w-[60%] flex justify-end my-auto gap-2">
            {productSelector}
            <div className="my-auto w-[110px] flex">
              <button
                type="button"
                className="w-[50px]"
                onClick={() => dispatch(toggleTheme())}
              >
                <i className={isDarkTheme ? 'fa-sharp fa-solid fa-sun text-2xl text-white' : 'fa-sharp fa-solid fa-moon text-2xl text-white'} />
              </button>
              <button
                type="button"
                aria-label="link to cart"
                data-testid="cart-button"
                className="w-[50px]"
                onMouseEnter={renderCart}
                onMouseLeave={hideCart}
              >
                <i className="fa-solid fa-cart-shopping text-white text-xl" />
              </button>
            </div>
          </div>
        </div>
        <CartDisplay />

      </div>
      <div className="header-bar h-14 bg-gradient-to-r from-primary-300 to-secondary-300" />
      <div className="relative overflow-x-auto header-bar w-full h-8 pt-2 text-xs italic text-center border-solid border-y-2 border-gray-100 dark:border-gray-900 bg-white dark:bg-black"><span className="overflow-x-auto">SITE-WIDE ANNOUNCEMENT MESSAGE!</span></div>
    </div>
  );
}

export default HeaderBar;
