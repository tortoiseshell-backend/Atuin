import axios from 'axios';
import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom/client';
// import TestRenderer from 'react-test-renderer';
import {
  render, fireEvent, screen, act, cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import store from '@store';
import {
  getProductDetailsAsync,
} from '@reducers/productSlice';
// import App from '@components/App.jsx';
import ProductOverview from '@components/productOverview';
import ImageGallery from '@components/productOverview/subComponents/imageGallery';
import product from './testdata/product';

jest.mock('axios');
let container;

beforeEach(() => {
  container = document.createElement('div');
  container.id = 'root';
  document.body.appendChild(container);
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
  document.body.removeChild(container);
  container = null;
});

Element.prototype.scrollTo = () => {};

test('renders the product overview component', async () => {
  axios.get.mockResolvedValue({ data: product });

  await act(async () => {
    ReactDOM.createRoot(container).render(
      <Provider store={store}>
        <ProductOverview />
      </Provider>,
    );
  });

  const testObject = document.querySelector('#product-overview');
  expect(testObject).toBeInTheDocument();
});

test('renders the product overview component', async () => {
  axios.get.mockResolvedValue({ data: product });

  await act(async () => {
    ReactDOM.createRoot(container).render(
      <Provider store={store}>
        <ImageGallery />
      </Provider>,
    );
  });

  // const testObject = document.querySelector('#main-image');

  // await act(async () => {
  //   fireEvent.dblClick(screen.getByTestId('main-image'));
  //   fireEvent.dblClick(testObject);
  // });

  // console.log(screen.getByTestId('main-image').style.transform);
});
