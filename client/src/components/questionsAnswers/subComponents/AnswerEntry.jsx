import React from 'react';
import PropTypes from 'prop-types';

function AnswerEntry({ answerData }) {
  const answererName = answerData.answerer_name.toLowerCase() === 'Seller'
    ? <span className="font-semibold text-violet-700">Seller</span>
    : <span>{answerData.answerer_name}</span>;

  const date = new Date(answerData.date);
  const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;

  const markHelpful = () => {
    // mark helpful
  };

  const markReported = () => {
    // mark helpful
  };

  return (
    <div className="mb-4">
      <div>
        <p className="text-gray-700 dark:text-gray-300" style={{ wordBreak: 'break-word' }}>{answerData.body}</p>
      </div>
      <div className="">
        <small className="inline-block">
          by &nbsp;
          {answererName}
          , &nbsp;
          {formattedDate}
          &nbsp;&nbsp;
        </small>
        <small className="inline-block border-l border-solid border-gray-500">
          &nbsp;&nbsp; Helpful? &nbsp;
          <button type="button" className="underline text-secondary-200 dark:text-secondary-300 hover:text-violet-600 dark:hover:text-primary-300" onClick={markHelpful}>
            Yes
          </button>
          &nbsp;(
          {answerData.helpfulness}
          ) &nbsp;&nbsp;
        </small>
        <small className="inline-block border-l border-solid border-gray-500">
          &nbsp;&nbsp;&nbsp;
          <button type="button" className="underline text-secondary-200 dark:text-secondary-300 hover:text-violet-600 dark:hover:text-primary-300" onClick={markReported}>
            Report
          </button>
        </small>
      </div>
    </div>
  );
}

AnswerEntry.propTypes = {
  answerData: PropTypes.shape({
    answerer_name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    helpfulness: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default AnswerEntry;
