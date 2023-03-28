import '@testing-library/jest-dom';
import {
  render, fireEvent, screen, act, cleanup,
} from '@testing-library/react';
import React from 'react';
import App from '@components/ratingsReviews/index';
import { Provider } from 'react-redux';
import store from '@store';
import axios from 'axios';

jest.mock('axios');
afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test('renders Tile component within modal', async () => {
  const mockData = {
    product: '40346',
    page: 0,
    count: 10,
    results: [
      {
        review_id: 1277012,
        rating: 3,
        summary: 'dfgdfg',
        recommend: false,
        response: null,
        body: 'this is a test to see if anything is working incorrectly. it is very wordy.',
        date: '2022-10-21T00:00:00.000Z',
        reviewer_name: 'dsfsdf',
        helpfulness: 2,
        photos: [],
      },
      {
        review_id: 1275619,
        rating: 2,
        summary: 'This is a great product',
        recommend: true,
        response: null,
        body: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        date: '2022-07-18T00:00:00.000Z',
        reviewer_name: 'ibraheeeeeem',
        helpfulness: 0,
        photos: [
          {
            id: 2455491,
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
          },
        ],
      },
    ],
  };

  axios.get.mockResolvedValue({ data: mockData }); // mock the API call

  // render the component
  await act(async () => {
    render(
      <Provider store={store}>
        <RatingsReviews />
      </Provider>,
    );
  });

  // click the "Write a review" button to open the modal
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /Write a review/i }));
  });

  // wait for the modal to appear
  const modal = await screen.findByTestId('modal');
  // check if the Tile component is rendered within the modal
  await expect(modal).toContainElement(screen.queryByTestId('content'));
});
