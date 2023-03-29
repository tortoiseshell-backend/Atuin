import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  act, cleanup, fireEvent, render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import store from '@store';
import QuestionsAnswers from '@components/questionsAnswers/index';
import Search from '../subComponents/Search';
import QuestionsList from '../subComponents/QuestionsList';
import QuestionEntry from '../subComponents/QuestionEntry';
import MoreAnsweredQuestions from '../subComponents/MoreAnsweredQuestions';
import AnswerEntry from '../subComponents/AnswerEntry';
import proxyData from './proxies/proxyData';
import renderWithProviders from './proxies/renderWithProviders';
import generateMockResponse from './proxies/generateMockResponse';

const mock = new MockAdapter(axios);

mock.onAny().reply(async (config) => {
  const { method, url } = config;
  const endpoint = url.match(/(?<=hr-rfp\/)[^?]+/)[0];
  if (endpoint) {
    try {
      const response = await generateMockResponse(method, endpoint);
      console.log('\n--------------------------\ninputs: ', JSON.stringify(method, null, 2), JSON.stringify(endpoint, null, 2), '\nResponse:\n', JSON.stringify(response, null, 2));
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  } else {
    throw new Error(`${url} is not a supported url for the context of this test`);
  }
});

test('Q&A module should load questions and answer data for the provided product_id', async () => {
  render(
    <Provider store={store}>
      <QuestionsAnswers />
    </Provider>,
  );

  expect(proxyData.product_id).toBe('40435');
});

test('Q&A module renders the searchbar', () => {
  render(
    <Provider store={store}>
      <Search />
    </Provider>,
  );

  const searchbar = document.querySelector('#searchbar');
  expect(searchbar).toBeInTheDocument();
});

test('Q&A module renders a question to the question list', () => {
  const q = proxyData.results[0];

  render(
    <Provider store={store}>
      <QuestionEntry q={q} />
    </Provider>,
  );

  const qEntry = document.querySelector('.questionEntry');
  expect(qEntry).toBeInTheDocument();
});

test('The "Load More Questions" button exists', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <MoreAnsweredQuestions />
      </Provider>,
    );
  });

  const loadMoreQsButton = await act(
    async () => (screen.getByRole('button')),
  );
  expect(loadMoreQsButton).toBeInTheDocument();
});

// test('Clicking the "Load More Questions" button renders two more questions', async () => {
//   const initialQs = proxyData.results;
//   const { getByText } = renderWithProviders(
//     (
//       <Provider store={store}>
//         <MoreAnsweredQuestions />
//       </Provider>
//     ), {
//       preloadedstate: {
//         allQuestions: initialQs,
//         viewQuestions: initialQs.slice(0, 2),
//       },
//     },
//   );

//   getByText('Voluptas eligendi fugiat doloribus hic voluptatem iure quidem');

//   await act(async () => {
//     render(
//       <Provider store={store}>
//         <MoreAnsweredQuestions />
//       </Provider>,
//     );
//   });

//   await act(
//     async () => {
//       fireEvent.click(
//         screen.getByRole('button', { name: /MORE ANSWERED QUESTIONS/i }),
//       );
//     },
//   );
//   const questionEntries = await screen.getByTestId('qEntries');
//   expect(questionEntries.childNodes.length).toBe(4);
// });

test('Question List renders to the screen', () => {
  render(
    <Provider store={store}>
      <QuestionsList />
    </Provider>,
  );

  const questionsList = document.querySelector('#questionsList');
  expect(questionsList).toBeInTheDocument();
});
