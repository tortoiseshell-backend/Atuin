import '@testing-library/jest-dom';
import {
  render, fireEvent, screen, act, waitFor,
} from '@testing-library/react';
import React from 'react';
import App from '@components/App';
import { Provider } from 'react-redux';
import store from '@store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import generateMockResponse from '@mock';
import NewReviewModal from '@components/ratingsReviews/subComponents/NewReviewModal';


describe('Ratings and Reviews', () => {
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

  test('renders anything', async () => {
    // render the component
    await act(() => {
      render(
        <Provider store={store}>
          <App />
        </Provider>,
      );
    });
    // wait for the anything to appear
    await screen.findAllByTestId('notAnything');
    const test = await screen.findAllByTestId('notAnything1');
    await waitFor(() => expect(test[0]).toBeInTheDocument());
    // await waitFor(async () => fireEvent.click(await screen.findByTestId('openWriteReviewModel')));
  });

  test('renders NewReviewModal', () => {
    render(
      <Provider store={store}>
        <NewReviewModal />
      </Provider>,
    );
    expect(screen.getByTestId('newReviewModel')).toBeInTheDocument();
    // click the "Yes" radio button
    fireEvent.click(screen.getByTestId('radioYes'));
  });
});
