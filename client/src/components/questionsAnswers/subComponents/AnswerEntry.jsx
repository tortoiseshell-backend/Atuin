import React from 'react';

function AnswerEntry({ answerData }) {
  const answererName = answerData.answerer_name === 'Seller'
    ? <span className="font-semibold text-violet-700">Seller</span>
    : <span>{answerData.answerer_name}</span>;

  const date = new Date(answerData.date);
  const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <div className="mb-4">
      <p className="break-words text-gray-500">{answerData.body}</p>
      <small className="text-gray-500">
        by &nbsp;
        {answererName}
        , &nbsp;
        {formattedDate}
        &nbsp;&nbsp;
      </small>
      <small className="text-gray-500 border-x border-solid border-gray-500">
        &nbsp;&nbsp; Helpful? &nbsp;
        <span className="underline text-violet-700">Yes </span>
        &nbsp; (
        {answerData.helpfulness}
        ) &nbsp;&nbsp;
      </small>
      <small>
        &nbsp;&nbsp;
        <span className="underline text-violet-700">Report</span>
      </small>
    </div>
  );
}

export default AnswerEntry;
