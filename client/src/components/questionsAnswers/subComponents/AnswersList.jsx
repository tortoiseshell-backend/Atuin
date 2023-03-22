import React from 'react';
import AnswerEntry from './AnswerEntry';

function AnswersList({ answersObj }) {
  const answers = [];

  for (const a in answersObj) {
    answers.push(answersObj[a]);
  }

  return (
    <div className="max-w-3xl">
      {answers.map((a) => <AnswerEntry answerData={a} key={a.id} />)}
    </div>
  );
}

export default AnswersList;
