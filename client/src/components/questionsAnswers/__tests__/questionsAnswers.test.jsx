import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuestionEntry from '../subComponents/QuestionEntry';

test('Q&A module renders a question to the question list', () => {
  const q = {
    answers: {},
    asker_name: 'Kaden15',
    question_body: 'Ab vel ipsam sed aut voluptate exercitationem culpa.',
    question_date: '2020-08-31T00:00:00.000Z',
    question_helpfulness: 19,
    question_id: 329883,
    reported: false,
  };
  render(<QuestionEntry q={q} />);

  const div = document.querySelector('.qEntry');
  expect(div).toBeInTheDocument();
});
