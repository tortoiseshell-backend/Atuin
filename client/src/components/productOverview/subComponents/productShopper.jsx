import React from 'react';
import { useSelector } from 'react-redux';
import StyleSelector from './styleSelector';
import AddToCart from './addToCart';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const productShopperStyle = 'grid auto-rows-max gap-2 p-4';

function ProductShopper() {
  const styles = useSelector((state) => state.product.styles);
  const name = useSelector((state) => state.product.name);
  const category = useSelector((state) => state.product.category);
  const defaultPrice = useSelector((state) => state.product.default_price);
  const selectedStyle = useSelector((state) => state.product.selectedStyleID);
  let styleText = null;

  const styleSelectorList = styles.map((style) => {
    if (selectedStyle === style.style_id) {
      styleText = style.name;
    }
    return <StyleSelector style={style} key={style.style_id} />;
  });

  return (
    <div className={productShopperStyle}>
      <div className="row-span-1 text-xs">
        Read all reviews
      </div>
      <div className="row-span-1 text-sm">
        {(category || 'CATEGORY').toUpperCase()}
      </div>
      <div className="row-span-1 text-4xl font-extrabold">
        {name}
      </div>
      <div className="row-span-1 text-md mt-1 mb-1">
        {currencyFormatter.format(defaultPrice)}
      </div>
      <div className="row-span-1">
        <div className="mb-2">
          <span className="text-sm font-extrabold">STYLE &gt; </span>
          <span className="text-sm">{styleText}</span>
        </div>
        <div className="grid grid-cols-4 grid-flow-row gap-3 w-0 min-w-max">
          {styleSelectorList}
        </div>
      </div>
      <div className="row-span-1">
        <AddToCart />
      </div>
      <div className="row-span-1">
        socialMedia
      </div>
    </div>
  );
}

export default ProductShopper;
