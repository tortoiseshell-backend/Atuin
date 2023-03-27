import React from 'react';
import PropTypes from 'prop-types';

function AnswerEntry({ answerData }) {
  const answererName = answerData.answerer_name.toLowerCase() === 'Seller'
    ? <span className="font-semibold text-violet-700">Seller</span>
    : <span className="text-gray-500">{answerData.answerer_name}</span>;

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
        <p className="inline-flex break-words text-gray-500">{answerData.body}</p>
      </div>
      <div className="">
        <small className="inline-block text-gray-500">
          by &nbsp;
          {answererName}
          , &nbsp;
          {formattedDate}
          &nbsp;&nbsp;
        </small>
        <small className="inline-block text-gray-500 border-l border-solid border-gray-500">
          &nbsp;&nbsp; Helpful? &nbsp;
          <button type="button" className="underline text-secondary-200 hover:text-violet-600" onClick={markHelpful}>
            Yes
          </button>
          &nbsp;(
          {answerData.helpfulness}
          ) &nbsp;&nbsp;
        </small>
        <small className="inline-block border-l border-solid border-gray-500">
          &nbsp;&nbsp;&nbsp;
          <button type="button" className="underline text-secondary-200 hover:text-violet-600" onClick={markReported}>
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
