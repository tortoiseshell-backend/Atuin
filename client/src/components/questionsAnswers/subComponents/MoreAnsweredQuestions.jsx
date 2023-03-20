import React from 'react';
import questions from './initialData.jsx';

const MoreAnsweredQuestions = () => {
  if (questions.results.length > 2) {
    return <button className="mt-3 mr-3 border-solid border-[3px] border-violet-700 text-violet-700 font-semibold p-4">MORE ANSWERED QUESTIONS</button>
  }
}

export default MoreAnsweredQuestions;