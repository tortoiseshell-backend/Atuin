import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { expandAnswers } from '@reducers/qnaSlice';
import PropTypes from 'prop-types';
import AnswerEntry from './AnswerEntry';

function AnswersList({ answersObj, qId }) {
  const { aViewExpanded } = useSelector((state) => state.qna);
  const dispatch = useDispatch();

  let isOpen = aViewExpanded[qId] || false;
  const buttonText = aViewExpanded[qId] ? 'COLLAPSE ANSWERS' : 'LOAD MORE ANSWERS';

  const answerKeys = Object.keys(answersObj);
  const allAnswers = [];
  for (let i = 0; i < answerKeys.length; i += 1) {
    allAnswers.push(answersObj[answerKeys[i]]);
  }
  const sortedAnswers = allAnswers.sort((a, b) => {
    if (a.answerer_name.toLowerCase() === 'seller' && b.answerer_name.toLowerCase() !== 'seller') { return -1; }
    if (b.answerer_name.toLowerCase() === 'seller' && a.answerer_name.toLowerCase() !== 'seller') { return 1; }
    return b.helpfulness - a.helpfulness;
  });

  const viewAnswers = [];
  if (answerKeys.length) {
    let aViewLength = 1;
    if (answerKeys.length > 1) {
      aViewLength = isOpen ? answerKeys.length : 2;
    }
    for (let j = 0; j < aViewLength; j += 1) {
      viewAnswers.push(sortedAnswers[j]);
    }
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
    <div className="answerList max-h-[35vh] overflow-auto border border-primary-200 dark:border-neutral-500 rounded p-3">
      <style>
        {`
          .answerList::-webkit-scrollbar {
            width: 0.75vh;
            height: 2vh;
          }
          .answerList::-webkit-scrollbar-thumb {
            background-color: rgb(97 32 216);
            border-radius: 6px;
          }
          .answerList::-webkit-scrollbar-button {
            display: none;
          }
          .answerList::-webkit-scrollbar-track {
            background-color: #e5f4ff;
            border-radius: 6px;
          }
        `}
      </style>
      <div>
        {viewAnswers.map((a) => <AnswerEntry className="answerEntry" answerData={a} key={a.id} />)}
      </div>
      {answerKeys.length > 2 ? <button type="button" className="dark:text-stone-400 hover:text-secondary-300 dark:hover:text-primary-300 text-xs font-semibold" value={qId} onClick={handleClick}>{buttonText}</button> : null}
    </div>
  );
}

AnswersList.propTypes = {
  answersObj: PropTypes.shape({
    answerer_name: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    helpfulness: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  qId: PropTypes.number.isRequired,
};

export default AnswersList;
