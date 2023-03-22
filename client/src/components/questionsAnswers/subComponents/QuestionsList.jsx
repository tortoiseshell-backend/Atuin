import React from 'react';
import { useSelector } from 'react-redux';
import QuestionEntry from './QuestionEntry';

function QuestionsList() {
  const { viewQuestions } = useSelector((state) => state.qna);
  return (
    <div>
      {viewQuestions.length === 0
        ? (
          <div className="w-[976px] text-gray-600">
            No results available.
          </div>
        )
        : viewQuestions.map((q) => (
          <div key={q.question_id}>
            <QuestionEntry q={q} />
          </div>
        ))}
    </div>
  );
}

export default QuestionsList;
