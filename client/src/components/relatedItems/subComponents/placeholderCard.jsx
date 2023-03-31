import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOutfitItem } from '@reducers/relatedSlice';

export default function PlaceholderCard() {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.product.value);

  function addOutfitItemHandler() {
    dispatch(addOutfitItem(productDetails));
  }

  return (
    <button type="button" className="flex h-72 w-48 border-2 p-18 border-secondary-300 dark:border-primary-300 bg-white dark:bg-black" onClick={addOutfitItemHandler}>
      <i className="self-center mx-auto fa-solid fa-circle-plus text-8xl" />
    </button>
  );
}
