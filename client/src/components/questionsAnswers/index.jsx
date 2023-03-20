import React from 'react';
import Search from './subComponents/Search.jsx';
import QuestionsList from './subComponents/QuestionsList.jsx';
import MoreAnsweredQuestions from './subComponents/MoreAnsweredQuestions.jsx';

function QuestionsAnswers() {
  return (
    <div className="p-5 border-solid border-2 border-sky-500">
      <h3 className="text-gray-600">QUESTIONS & ANSWERS</h3>
      <Search />
      <QuestionsList />
      <div>
        <MoreAnsweredQuestions />
        <button className="mt-3 border-solid border-[3px] border-violet-700 text-violet-700 font-semibold p-4">ADD A QUESTION</button>
      </div>
    </div>
  )
}

export default QuestionsAnswers;
