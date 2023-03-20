import React from 'react';
import AnswersList from './AnswersList.jsx';

const QuestionEntry = ({q}) => {
  return (
    <div className="grid grid-cols-[40px_3fr_1fr] p-4">
      <h3 className="font-semibold text-gray-500">Q: </h3>
      <h3 className="font-semibold text-gray-500">{q.question_body}</h3>
      <div>
        <span className="float-right text-xs">Helpful? <a>Yes</a> ({q.question_helpfulness}) | <a>Add Answer</a> </span>
      </div>
      <h3 className="mt-4 font-semibold text-gray-500">A: </h3>
      <div className="mt-4">
        <AnswersList answers={q.answers} />
      </div>
    </div>
  )
}

export default QuestionEntry;