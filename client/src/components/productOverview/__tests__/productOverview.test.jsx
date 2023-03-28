import ImageGallery from '@components/productOverview/subComponents/imageGallery';
import React from 'react';
import {
  render, fireEvent, screen, act, cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '@store';
import axios from 'axios';
import product from './testdata/product';

jest.mock('axios');
afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test('renders the image gallery', async () => {
  axios.get.mockResolvedValue({ data: product });

  await act(async () => {
    render(
      <Provider store={store}>
        <ImageGallery />
      </Provider>,
    );
  });

  const testObject = document.querySelector('#image-gallery');

  expect(testObject).toBeInTheDocument();
});
