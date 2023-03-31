import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMoreQuestions } from '@reducers/qnaSlice';
import Button from '@modular/Button';

function MoreAnsweredQuestions() {
  const { allQuestions, viewQuestions } = useSelector((state) => state.qna);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(loadMoreQuestions());
  };

  return (
    <div role="button">
      {viewQuestions.length < allQuestions.length
        ? <Button name="loadMoreQs" content="MORE ANSWERED QUESTIONS" onClick={handleClick} />
        : null}
    </div>
  );
}

export default MoreAnsweredQuestions;
