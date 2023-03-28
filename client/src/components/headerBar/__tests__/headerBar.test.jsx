import App from '@components/App.jsx';
import HeaderBar from '@components/headerBar';
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

Element.prototype.scrollTo = () => {};

test('renders the header bar component', async () => {
  axios.get.mockResolvedValue({ data: product });

  await act(async () => {
    render(
      <Provider store={store}>
        <HeaderBar />
      </Provider>,
    );
  });

  const testObject = document.querySelector('#header-bar');

  expect(testObject).toBeInTheDocument();
});
