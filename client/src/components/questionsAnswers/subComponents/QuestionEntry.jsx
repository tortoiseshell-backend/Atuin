import React from 'react';
import AnswersList from './AnswersList';

function QuestionEntry({ q }) {
  return (
    <div className="qEntry grid grid-cols-[35px_1fr_275px] p-4">
      <h3 className="font-semibold text-gray-500">Q: </h3>
      <h3 className="inline font-semibold text-gray-500">{q.question_body}</h3>
      <div className="ml-5">
        <div className="flex justify-end">
          <small className="text-gray-500 border-r border-solid border-r-gray-500">
            Helpful? &nbsp;&nbsp;
            <span className="underline text-violet-700">
              Yes
            </span>
            &nbsp; (
            {q.question_helpfulness}
            ) &nbsp;
          </small>
          <small>
            &nbsp;&nbsp;
            <span className="underline text-violet-700">
              Add Answer
            </span>
          </small>
        </div>
      </div>
      <h3 className="mt-4 font-semibold text-gray-500">A: </h3>
      <div className="mt-4">
        <AnswersList answersObj={q.answers} qId={q.question_id} />
      </div>
    </div>
  );
}

export default QuestionEntry;
