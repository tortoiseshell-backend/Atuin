import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { expandAnswers } from '../../../reducers/qnaSlice';
import AnswerEntry from './AnswerEntry';

function AnswersList({ answersObj, qId }) {
  const { aViewExpanded } = useSelector((state) => state.qna);
  const dispatch = useDispatch();

  let isOpen = aViewExpanded[qId] || false;
  const buttonText = aViewExpanded[qId] ? 'COLLAPSE ANSWERS' : 'LOAD MORE ANSWERS';

  const aViewLength = isOpen ? Object.keys(answersObj).length : 2;
  const answers = [];
  const answerKeys = Object.keys(answersObj);

  for (let i = 0; i < aViewLength; i += 1) {
    answers.push(answersObj[answerKeys[i]]);
  }

  function handleClick(e) {
    e.preventDefault();
    isOpen = (!isOpen);
    const payload = {
      qId: e.target.attributes.value.value,
      opened: isOpen,
    };
    dispatch(expandAnswers(payload));
  }

  return (
    <div>
      <div className="max-w-3xl">
        {answers.map((a) => <AnswerEntry className="answerEntry" answerData={a} key={a.id} />)}
      </div>
      <button type="button" className="text-gray-500 text-xs font-semibold" value={qId} onClick={handleClick}>{buttonText}</button>
    </div>
  );
}

export default AnswersList;
