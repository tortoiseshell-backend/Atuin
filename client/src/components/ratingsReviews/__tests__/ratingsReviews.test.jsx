import '@testing-library/jest-dom';
import {
  render, fireEvent, screen, act,
} from '@testing-library/react';
import React from 'react';
import ImageTile from '@modular/ImageTile';
import { Provider } from 'react-redux';
import store from '@store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import generateMockResponse from './__mocks__/generateMockResponse';

const mock = new MockAdapter(axios);

mock.onAny().reply((config) => {
  const { method, url } = config;
  const endpoint = url.match(/(?<=hr-rfp\/)[^?]+/)[0];
  if (endpoint) {
    try {
      const response = generateMockResponse(method, endpoint);
      return [...response];
    } catch (err) {
      throw new Error(err);
    }
  } else {
    throw new Error(`${url} is not a supported url for the context of this test`);
  }
});

test('renders Tile component within modal', async () => {
  const photo = {
    id: 2455491,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
  };

  // render the component
  await act(async () => {
    render(
      <Provider store={store}>
        <ImageTile photo={photo} />
      </Provider>,
    );
  });

  // wait for the modal to appear
  const test = await screen.findByTestId('image-container');
  // check if the Tile component is rendered within the modal
  await expect(test).toContainElement(screen.findByTestId('image'));
});
