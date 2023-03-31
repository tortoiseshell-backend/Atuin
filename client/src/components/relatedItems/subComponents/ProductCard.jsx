import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getProductDetailsAsync,
} from '@reducers/productSlice';
import {
  addOutfitItem,
} from '@reducers/relatedSlice';
import StarRatingView from '@modular/StarRatingView';
import defaultImage from '@images/place-holder.jpg';
import checkValidImage from '@lib/checkValidImage';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function ProductCard({ item }) {
  const dispatch = useDispatch();
  const averageRating = useSelector((state) => state.reviews.metaData).averageRating || 0;
  const { name, category, default_price } = item;
  let isFavorited = false;
  useSelector((state) => state.related.itemsOutfit).forEach((product) => {
    if (product.id === item.id) {
      isFavorited = true;
    }
  });
  let photoURL = item.results[0].photos[0].url;
  let cardStyle = 'h-72 w-48 border-2';
  let imageStyle = 'object-cover w-full h-48';
  let textboxStyle = ' text-left p-2';
  let starStyle = 'absolute top-2 right-3 z-20';

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  if (isDarkTheme) {
    cardStyle += ' border-primary-300';
    imageStyle += ' bg-gray-900';
    textboxStyle += ' bg-black';
    starStyle += ' text-primary-300';
  } else {
    cardStyle += ' border-secondary-300';
    imageStyle += ' bg-gray-100';
    textboxStyle += ' bg-white';
    starStyle += ' text-secondary-300';
  }

  let starIconType = 'fa-sharp fa-regular fa-star';
  if (isFavorited) {
    starIconType = 'fa-sharp fa-solid fa-star';
  }

  checkValidImage(photoURL, (isValid) => {
    if (!isValid) { photoURL = defaultImage; }
    if (document.getElementById('app')) {
      document.getElementById(`related-${item.id}`).src = photoURL;
    }
  });

  function linkToProduct() {
    dispatch(getProductDetailsAsync(item.id));
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function addOutfitItemHandler() {
    dispatch(addOutfitItem(item));
  }

  return (
    <div className="relative border-2 ">
      <button type="button" className={cardStyle} onClick={linkToProduct}>
        <div>
          <div>
            <img id={`related-${item.id}`} src={photoURL} alt="related item" className={imageStyle} />
          </div>
          <div className={textboxStyle}>
            <div className="row-span-1 text-xs">
              {(category || 'CATEGORY').toUpperCase()}
            </div>
            <div className="row-span-1 text-sm font-extrabold">
              {name}
            </div>
            <div className="row-span-1 text-xs mt-1 mb-1">
              {currencyFormatter.format(default_price)}
            </div>
            <div className="row-span-1 text-xs flex">
              {StarRatingView({ averageRating })}
            </div>
          </div>
        </div>
      </button>
      <button type="button" aria-label="like this item" className={starStyle} onClick={addOutfitItemHandler}><i className={starIconType} /></button>
    </div>
  );
}

ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    results: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
        }),
      ),
    ),
    count: PropTypes.number.isRequired,
    default_price: PropTypes.number.isRequired,
  }).isRequired,
};
