import React from 'react';
import { useSelector } from 'react-redux';
import ThumbnailCard from './thumbnailCard';
import scrollCarousel from '../scripts/scrollCarousel';

function ThumbnailCarousel() {
  let thumbnailList = [];
  const thumbnailCarouselStyle = 'absolute top-4 left-2';
  useSelector((state) => state.product.styles).forEach((style) => {
    thumbnailList = thumbnailList.concat(style.photos.map((photo, index) => (
      [style.style_id, index, photo.thumbnail_url, photo.url])));
  });
  const galleryStyle = 'w-24 h-[435px] overflow-y-hidden snap-y p-2';

  function scrollUpHandler() { scrollCarousel(-7, false); }
  function scrollDownHandler() { scrollCarousel(7, false); }

  const thumbnailCards = thumbnailList
    .map((thumbnail, index) => {
      const key = `${thumbnail[0]}-${thumbnail[1]}`;
      return (
        <ThumbnailCard
          thumbnail={thumbnail}
          index={index}
          key={key}
        />
      );
    });

  return (
    <div className={thumbnailCarouselStyle}>
      {thumbnailList.length > 7 ? <button type="button" aria-label="scroll up" className="mx-7" onClick={scrollUpHandler}><i className="fa-solid fa-caret-up text-3xl text-secondary-100 hover:text-secondary-200" /></button> : null}
      <div id="carousel-body" className={galleryStyle}>
        {thumbnailCards}
      </div>
      {thumbnailList.length > 7 ? <button type="button" aria-label="scroll up" className="mx-7" onClick={scrollDownHandler}><i className="fa-solid fa-caret-down text-3xl text-secondary-100 hover:text-secondary-200" /></button> : null }
    </div>
  );
}

export default ThumbnailCarousel;
