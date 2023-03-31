import React from 'react';
import { useSelector } from 'react-redux';
import QuestionEntry from './QuestionEntry';

function QuestionsList() {
  const { viewQuestions } = useSelector((state) => state.qna);

  return (
    <div id="questionsList">
      {viewQuestions.length === 0
        ? (
          <div className="m-5 text-gray-600 dark:text-stone-300">
            No results available.
          </div>
        )
        : (
          <div data-testid="qEntries">
            {viewQuestions.map((q) => (
              <QuestionEntry q={q} key={q.question_id} />
            ))}
          </div>
        )}
    </div>
  );
}

export default QuestionsList;
