import ReviewListTile from '@components/ratingsReviews/subComponents/ReviewListTile';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders a div with id "tile"', () => {
  // render your component or app here
  const review = {
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
  };
  render(<ReviewListTile review={review} />);

  // use querySelector to find the element
  const div = document.querySelector('#tile');

  // check if the element exists
  expect(div).toBeInTheDocument();
});
