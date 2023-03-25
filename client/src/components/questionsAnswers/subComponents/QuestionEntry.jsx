import React from 'react';
import PropTypes from 'prop-types';
import AnswersList from './AnswersList';

const axios = require('axios');

function QuestionEntry({ q }) {
  const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/:question_id/helpful';
  const API_CONFIG = {
    params: {
      question_id: q.question_id, // TODO: replace with global product_id variable
    },
    headers: {
      Authorization: process.env.AUTH_SECRET,
    },
  };

  // * Use localStorage.getItem(), setItem(), and removeItem()
  const markHelpful = () => {
    axios.put(API_URL, API_CONFIG)
      .then((res) => {
        console.log('res: ', res);
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  };

  return (
    <div className="questionEntry grid grid-cols-[35px_1fr_240px] flex p-4">
      <h3 className="font-semibold text-gray-500">Q: </h3>
      <h3 className="flex-wrap break-words font-semibold text-gray-500">{q.question_body}</h3>
      <div className="ml-5">
        <div className="flex justify-end">
          <small className="text-gray-500 border-r border-solid border-r-gray-500">
            Helpful? &nbsp;&nbsp;
            <button type="button" className="underline text-violet-700" onClick={markHelpful}>
              Yes
            </button>
            &nbsp; (
            {q.question_helpfulness}
            ) &nbsp;
          </small>
          <small>
            &nbsp;&nbsp;
            <button type="button" className="underline text-violet-700" onClick={markHelpful}>
              Add Answer
            </button>
          </small>
        </div>
      </div>
      <h3 className="mt-4 font-semibold text-gray-500">A: </h3>
      <div className="mt-4">
        <AnswersList className="answersList" answersObj={q.answers} qId={q.question_id} />
      </div>
    </div>
  );
}

QuestionEntry.propTypes = {
  q: PropTypes.shape({
    question_body: PropTypes.string.isRequired,
    question_helpfulness: PropTypes.number.isRequired,
    answers: PropTypes.shape({
      id: PropTypes.shape({
        answerer_name: PropTypes.string,
        body: PropTypes.string,
        date: PropTypes.string,
        helpfulness: PropTypes.number,
        id: PropTypes.number,
      }),
    }).isRequired,
    question_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default QuestionEntry;
