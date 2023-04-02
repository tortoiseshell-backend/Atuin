import React from 'react';
import { useSelector } from 'react-redux';
import StarRatingView from '@modular/StarRatingView';
import StyleSelector from './styleSelector';
import AddToCart from './addToCart';
import SocialMedia from './socialMedia';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const productShopperStyle = 'grid auto-rows-max gap-2 p-4';

function ProductShopper() {
  const averageRating = useSelector((state) => state.reviews.averageRating) || 0;
  const styles = useSelector((state) => state.product.styles);
  const name = useSelector((state) => state.product.name);
  const category = useSelector((state) => state.product.category);
  const defaultPrice = useSelector((state) => state.product.default_price);
  const salePrice = useSelector((state) => state.product.sale_price);
  const selectedStyle = useSelector((state) => state.product.selectedStyleID);
  let styleText = null;

  function scrollToReviews(event) {
    event.preventDefault();
    document.getElementById('ratingsReviews').scrollIntoView({ behavior: 'smooth' });
  }

  const styleSelectorList = styles.map((style) => {
    if (selectedStyle === style.style_id) {
      styleText = style.name;
    }
    return <StyleSelector style={style} key={style.style_id} />;
  });

  let defaultPriceStyle = '';
  let salePriceStyle = 'invisible';

  if (salePrice !== null) {
    defaultPriceStyle = 'line-through';
    salePriceStyle = 'visible font-bold text-red-600';
  }

  const renderPrice = (
    <>
      <span className={defaultPriceStyle}>{currencyFormatter.format(defaultPrice)}</span>
      &nbsp;
      <span className={salePriceStyle}>{currencyFormatter.format(salePrice)}</span>
    </>
  );

  return (
    <div className={productShopperStyle}>
      <a href="#ratingsReviews" className="row-span-1 text-xs flex text-gray-500 dark:text-gray-400" onClick={scrollToReviews}>
        {StarRatingView({ averageRating })}
        &nbsp;
        Read all reviews
      </a>
      <div className="row-span-1 text-sm">
        {(category || 'CATEGORY').toUpperCase()}
      </div>
      <div className="row-span-1 text-4xl font-extrabold">
        {name}
      </div>
      <div className="row-span-1 text-md mt-1 mb-1">
        {renderPrice}
      </div>
      <div className="row-span-1">
        <div className="mb-2">
          <span className="text-sm font-extrabold">STYLE &gt; </span>
          <span className="text-sm">{styleText}</span>
        </div>
        <div className="grid grid-cols-4 grid-flow-row gap-x-2 w-0 min-w-max">
          {styleSelectorList}
        </div>
      </div>
      <div className="row-span-1">
        <AddToCart />
      </div>
      <div className="row-span-1">
        <SocialMedia />
      </div>
    </div>
  );
}

export default ProductShopper;
