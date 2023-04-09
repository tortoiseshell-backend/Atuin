import React from 'react';
import { useDispatch } from 'react-redux';
import { toggle, setModalProps, setModalType } from '@reducers/modalSlice';
import PropTypes from 'prop-types';
import AnswersList from './AnswersList';

const axios = require('axios');

function QuestionEntry({ q }) {
  const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/:question_id/helpful';
  const API_CONFIG = {
    params: {
      question_id: q.question_id,
    },
    headers: {
      Authorization: process.env.AUTH_SECRET,
    },
  };

  // * Use localStorage.getItem(), setItem(), and removeItem()
  const markHelpful = () => {
  //   axios.put(API_URL, API_CONFIG)
  //     .then((res) => {
  //       console.log('res: ', res);
  //     })
  //     .catch((err) => {
  //       console.log('error: ', err);
  //     });
  };

  const qBodyId = {
    qBody: q.question_body,
    qId: q.question_id,
  };

  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(setModalProps({ qBodyId }));
    dispatch(setModalType('AddAnswerForm'));
    dispatch(toggle());
  };

  return (
    <div className="grid grid-cols-[1fr_75px] gap-4 p-4">
      <div className="questionEntry grid grid-cols-[35px_1fr] rounded-lg border border-primary-300 bg-white dark:bg-stone-950 p-4">
        <h3 className="text-gray-700 dark:text-gray-300 font-semibold">Q: </h3>
        <h3 className="text-gray-700 dark:text-gray-300 font-semibold" style={{ wordBreak: 'break-word' }}>{q.question_body}</h3>
        <h3 className="mt-[30px] text-gray-700 dark:text-gray-300 font-semibold">A: </h3>
        <div className="mt-4">
          <AnswersList className="answersList" answersObj={q.answers} qId={q.question_id} />
        </div>
      </div>
      <div className="flex flex-col pt-4">
        <small className="mb-3">
          Helpful?&nbsp;&nbsp;
          <br />
          <button type="button" className="underline text-secondary-200 dark:text-secondary-300 hover:text-violet-600 dark:hover:text-primary-300" onClick={markHelpful}>
            Yes
          </button>
          &nbsp;(
          {q.question_helpfulness}
          )
        </small>
        <small>
          <button type="button" className="underline text-secondary-200 dark:text-secondary-300 hover:text-violet-600 dark:hover:text-primary-300" onClick={toggleModal}>
            Add Answer
          </button>
        </small>
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
