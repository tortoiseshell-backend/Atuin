import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@store';
import '@testing-library/jest-dom';
import QuestionEntry from '../subComponents/QuestionEntry';

test('Q&A module renders a question to the question list', () => {
  const q = {
    answers: {
      a3081949: {
        answerer_name: 'Ludie_Lemke',
        body: 'Quia rem aut rerum sit.',
        date: '2020-12-01T00:00:00.000Z',
        helpfulness: 5,
        id: 'a3081949',
      },
    },
    asker_name: 'Kaden15',
    question_body: 'Ab vel ipsam sed aut voluptate exercitationem culpa.',
    question_date: '2020-08-31T00:00:00.000Z',
    question_helpfulness: 19,
    question_id: 329883,
    reported: false,
  };
  render(
    <Provider store={store}>
      <QuestionEntry q={q} />
    </Provider>,
  );

  const div = document.querySelector('.questionEntry');
  expect(div).toBeInTheDocument();
});
