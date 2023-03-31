import React from 'react';
import { useSelector } from 'react-redux';
import StarRatingView from '@modular/StarRatingView';
import defaultImage from '@images/place-holder.jpg';
import checkValidImage from '@lib/checkValidImage';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function RelatedProductCard({ item }) {
  const averageRating = useSelector((state) => state.reviews.metaData).averageRating || 0;
  console.log(item);
  const { name, category, default_price } = item;
  let photoURL = item.results[0].photos[0].url;
  let imageStyle = 'object-cover w-full h-48';

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  if (isDarkTheme) {
    imageStyle += ' bg-gray-900';
  } else {
    imageStyle += ' bg-gray-100';
  }

  checkValidImage(photoURL, (isValid) => {
    if (!isValid) { photoURL = defaultImage; }
    if (document.getElementById('app')) {
      document.getElementById(`related-${item.id}`).src = photoURL;
    }
  });

  return (
    <div className="h-72 w-48 border-2">
      <div>
        <div className="relative">
          <button type="button" className="absolute top-2 right-3">&#9734;</button>
          <img id={`related-${item.id}`} src={photoURL} alt="related item" className={imageStyle} />
        </div>
        <div className="bg-white p-2">
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
    </div>
  );
}
