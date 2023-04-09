import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGetResults } from '@reducers/qnaSlice';
import { toggle, setModalProps, setModalType } from '@reducers/modalSlice';
import Button from '@modular/Button';
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

  const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/';
  const API_CONFIG = {
    params: {
      product_id: id,
      page: 1,
      count: 200,
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
    <div>
      <h3>QUESTIONS & ANSWERS</h3>
      <Search />
      <div className="questionList max-h-[65vh] overflow-auto">
        <style>
          {`
            .questionList::-webkit-scrollbar {
              width: 1vh;
              height: 2vh;
            }
            .questionList::-webkit-scrollbar-thumb {
              background-color: rgb(97 32 216);
              border-radius: 6px;
            }
            .questionList::-webkit-scrollbar-button {
              display: none;
            }
            .questionList::-webkit-scrollbar-track {
              background-color: #fff;
              border-radius: 6px;
            }
          `}
        </style>
        <QuestionsList />
      </div>
      <div className="mt-3 ml-5 flex gap-3">
        <MoreAnsweredQuestions />
        <Button content="ADD A QUESTION" styleOverride="text-center" onClick={toggleModal} />
      </div>
    </div>
  );
}

export default QuestionsAnswers;
