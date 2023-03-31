import React from 'react';
import { useSelector } from 'react-redux';

export default function PlaceholderCard() {
  let cardStyle = 'flex h-72 w-48 border-2 p-18';

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  if (isDarkTheme) {
    cardStyle += ' border-primary-300 bg-black';
  } else {
    cardStyle += ' border-secondary-300 bg-white';
  }

  return (
    <div className={cardStyle}>
      <i className="self-center mx-auto fa-solid fa-circle-plus text-8xl" />
    </div>
  );
}
