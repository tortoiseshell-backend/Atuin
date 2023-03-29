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
    <div className="grid grid-cols-[1fr_125px] gap-2 flex p-4">
      <div className="questionEntry grid grid-cols-[35px_1fr] flex">
        <h3 className="font-semibold text-gray-500">Q: </h3>
        <h3 className="flex-wrap break-words font-semibold text-gray-500">{q.question_body}</h3>
        <h3 className="mt-4 font-semibold text-gray-500">A: </h3>
        <div className="mt-4">
          <AnswersList className="answersList" answersObj={q.answers} qId={q.question_id} />
        </div>
      </div>
      <div className="helpfulAddAnswer border-l border-l-gray-300">
        <div className="flex flex-col items-end">
          <small className="mb-2 text-end text-gray-400">
            Helpful?&nbsp;&nbsp;
            <button type="button" className="underline text-secondary-200 hover:text-violet-600" onClick={markHelpful}>
              Yes
            </button>
            &nbsp;(
            {q.question_helpfulness}
            )
          </small>
          {/* <hr className="my-2 w-[115px]" /> */}
          <small className="text-end">
            <button type="button" className="underline text-secondary-200 hover:text-violet-600" onClick={toggleModal}>
              Add Answer
            </button>
          </small>
        </div>
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
