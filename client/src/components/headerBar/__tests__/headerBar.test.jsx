import '@testing-library/jest-dom';
import {
  render, fireEvent, screen, act, waitFor,
} from '@testing-library/react';
import React from 'react';
// import App from '@components/App';
import HeaderBar from '@components/headerBar';
import { Provider } from 'react-redux';
import store from '@store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import generateMockResponse from './__mocks__/generateMockResponse';

const mock = new MockAdapter(axios);

mock.onAny().reply(async (config) => {
  const { method, url } = config;
  const endpoint = url.match(/(?<=hr-rfp\/)[^?]+/)[0];
  if (endpoint) {
    try {
      const response = await generateMockResponse(method, endpoint);
      return response;
    } catch (err) {
      throw new Error(err);
    }
  } else {
    throw new Error(`${url} is not a supported url for the context of this test`);
  }
});

const mockScrollTo = jest.fn();

Object.defineProperty(global.window.HTMLElement.prototype, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

describe('Header Bar tests', () => {
  test('Renders header bar to document', async () => {
    // render the component
    await act(() => {
      render(
        <Provider store={store}>
          <HeaderBar />
        </Provider>,
      );
    });
    // wait for the anything to appear
    const testObject = await screen.getByTestId('header-bar');
    await waitFor(() => expect(testObject).toBeInTheDocument());
  });

  test('Product selector renders available products', async () => {
    // render the component
    await act(() => {
      render(
        <Provider store={store}>
          <HeaderBar />
        </Provider>,
      );
    });

    // wait for the anything to appear
    const testObject = await screen.getByTestId('product-selector');
    await fireEvent.click(testObject);
    const testOptions = await screen.getAllByTestId('product-dropdown', { value: 2 });
    await waitFor(() => expect(testOptions[0].textContent).toEqual('Camo Onesie'));
  });

  test('Cart renders items', async () => {
    // render the component
    await act(() => {
      render(
        <Provider store={store}>
          <HeaderBar />
        </Provider>,
      );
    });

    // wait for the anything to appear
    const testObject = await screen.getByTestId('cart-button');
    const testRenders = await screen.getByTestId('cart-list');
    await fireEvent.mouseOver(testObject);
    await fireEvent.mouseEnter(testObject);
    await waitFor(() => expect(testRenders).toBeVisible());
    await fireEvent.mouseLeave(testObject);
    await waitFor(() => expect(testRenders).not.toBeVisible());
    const testRenderList = await screen.getAllByTestId('cart-item');
    await waitFor(() => expect(testRenderList.length).toEqual(3));
  });
});
