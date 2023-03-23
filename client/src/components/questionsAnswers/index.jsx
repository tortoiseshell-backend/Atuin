import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveGetResults } from '../../reducers/qnaSlice';
import Search from './subComponents/Search';
import QuestionsList from './subComponents/QuestionsList';
import MoreAnsweredQuestions from './subComponents/MoreAnsweredQuestions';
import AddQuestion from './subComponents/AddQuestion';

const axios = require('axios');

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions';
const API_CONFIG = {
  params: {
    product_id: 40425, // TODO: replace with global product_id variable
    page: 1,
    count: 5,
  },
  headers: {
    Authorization: process.env.AUTH_SECRET,
  },
};

function QuestionsAnswers() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(API_URL, API_CONFIG)
      .then((res) => {
        dispatch(saveGetResults(res.data));
      })
      .catch((err) => {
        console.log('GET ERROR: ', err);
      });
  }, []);

  return (
    <div className="mx-auto min-w-max max-w-min p-5">
      <h3 className="text-gray-600">QUESTIONS & ANSWERS</h3>
      <Search />
      <QuestionsList />
      <div className="flex">
        <MoreAnsweredQuestions />
        <AddQuestion />
      </div>
    </div>
  );
}

export default QuestionsAnswers;
