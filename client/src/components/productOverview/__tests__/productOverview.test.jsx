import ImageGallery from '@components/productOverview/subComponents/imageGallery';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import product from './testdata/product';

test('renders a div with id "tile"', () => {
  // render your component or app here
  render(<ImageGallery />);

  // use querySelector to find the element
  const testObject = document.querySelector('#image-gallery');

  // check if the element exists
  expect(testObject).toBeInTheDocument();
});
