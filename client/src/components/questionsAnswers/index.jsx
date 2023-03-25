import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveGetResults } from '@reducers/qnaSlice';
import { toggle, setModalProps, setModalType } from '@reducers/modalSlice';
import Search from './subComponents/Search';
import QuestionsList from './subComponents/QuestionsList';
import MoreAnsweredQuestions from './subComponents/MoreAnsweredQuestions';
import AddQForm from './subComponents/AddQForm';

// import AddQuestion from './subComponents/AddQuestion';

const axios = require('axios');

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions';
const API_CONFIG = {
  params: {
    product_id: 40435, // TODO: replace with global product_id variable
    page: 1,
    count: 5,
  },
  headers: {
    Authorization: process.env.AUTH_SECRET,
  },
};

function QuestionsAnswers() {
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(setModalProps(<AddQForm />));
    dispatch(setModalType('AddQuestionForm'));
    dispatch(toggle());
  };

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
    <div className="mx-auto p-5">
      <h3 className="text-gray-600">QUESTIONS & ANSWERS</h3>
      <Search />
      <QuestionsList />
      <div className="flex">
        <MoreAnsweredQuestions />
        <button type="button" className="mt-3 border-solid border-[3px] border-violet-700 text-violet-700 font-semibold p-4" onClick={toggleModal}>ADD A QUESTION</button>
      </div>
    </div>
  );
}

export default QuestionsAnswers;
