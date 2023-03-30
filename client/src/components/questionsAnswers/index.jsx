import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGetResults } from '@reducers/qnaSlice';
import { toggle, setModalProps, setModalType } from '@reducers/modalSlice';
import Search from './subComponents/Search';
import QuestionsList from './subComponents/QuestionsList';
import MoreAnsweredQuestions from './subComponents/MoreAnsweredQuestions';

const axios = require('axios');

function QuestionsAnswers() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.product.id);
  const toggleModal = () => {
    dispatch(setModalProps({}));
    dispatch(setModalType('AddQuestionForm'));
    dispatch(toggle());
  };
  console.log(id);
  const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/';
  const API_CONFIG = {
    params: {
      product_id: id,
      page: 1,
      count: 20,
    },
    headers: {
      Authorization: process.env.AUTH_SECRET,
    },
  };

  useEffect(() => {
    axios.get(API_URL, API_CONFIG)
      .then((res) => {
        dispatch(saveGetResults(res.data));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [id]);

  return (
    <div className="mx-auto p-10 bg-primary-100">
      <h3 className="text-gray-600">QUESTIONS & ANSWERS</h3>
      <Search />
      <QuestionsList />
      <div className="ml-5 flex">
        <MoreAnsweredQuestions />
        <button type="button" className="mt-3 border-solid border-[3px] border-violet-700 text-violet-700 hover:bg-white font-semibold p-4" onClick={toggleModal}>ADD A QUESTION</button>
      </div>
    </div>
  );
}

export default QuestionsAnswers;
