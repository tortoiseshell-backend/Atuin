import React from 'react';
import AnswerEntry from './AnswerEntry.jsx';

const AnswersList = ({answers}) => {
  console.log('answers: ', answers);
  for (let a in answers) {
    console.log('a: ', a);
    return (
      <div>
        AnswerList
        <AnswerEntry />
      </div>
    )
  }
}

export default AnswersList;