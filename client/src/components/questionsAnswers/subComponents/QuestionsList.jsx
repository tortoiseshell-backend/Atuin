import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';
// import questions from './initialData.jsx';
import { useSelector } from 'react-redux';

const QuestionsList = () => {
  const { questions } = useSelector((state) => state.qna);
  return questions.map((q) => {
    return (
      <div key={q.question_id}>
        <QuestionEntry q={q} />
      </div>
    )
  })
}

export default QuestionsList;