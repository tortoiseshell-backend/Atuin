import React from 'react';
import { useSelector } from 'react-redux';
import QuestionEntry from './QuestionEntry';

function QuestionsList() {
  const { viewQuestions } = useSelector((state) => state.qna);
  return (
    <div id="questionsList">
      {viewQuestions.length === 0
        ? (
          <div className="w-[976px] text-gray-600">
            No results available.
          </div>
        )
        : (
          <div>
            {viewQuestions.map((q) => (
              <QuestionEntry q={q} key={q.question_id} />
            ))}
          </div>
        )}
    </div>
  );
}

export default QuestionsList;
