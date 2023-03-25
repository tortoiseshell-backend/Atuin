import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMoreQuestions } from '@reducers/qnaSlice';

function MoreAnsweredQuestions() {
  const { allQuestions, viewQuestions } = useSelector((state) => state.qna);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(loadMoreQuestions());
  };

  if (viewQuestions.length < allQuestions.length) {
    return <button type="button" className="mt-3 mr-3 border-solid border-[3px] border-violet-700 text-violet-700 font-semibold p-4" onClick={handleClick}>MORE ANSWERED QUESTIONS</button>;
  }
}

export default MoreAnsweredQuestions;
