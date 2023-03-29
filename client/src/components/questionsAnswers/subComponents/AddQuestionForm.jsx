import React from 'react';
import { useSelector } from 'react-redux';

const axios = require('axios');

function AddQuestionForm() {
  const { name, id } = useSelector((state) => state.product);

  const submitHandler = (e) => {
    e.preventDefault();

    const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/';
    const API_CONFIG = {
      headers: {
        Authorization: process.env.AUTH_SECRET,
      },
    };
    const API_DATA = {
      body: e.target[0].value,
      name: e.target[1].value,
      email: e.target[2].value,
      product_id: id,
    };

    axios.post(API_URL, API_DATA, API_CONFIG)
      .then((res) => {
        console.log('POST RES: ', res);
      })
      .catch((err) => {
        throw new Error('ERROR: ', err);
      });
  };

  return (
    <div className="m-5">

      <h3 className="text-xl font-bold text-gray-500">Ask Your Question</h3>
      <h5 className="font-semibold text-gray-500">
        about the&nbsp;
        {name}
      </h5>

      <form className="m-10" onSubmit={submitHandler}>
        <div className="yourQuestion my-5">
          <p className="text-gray-500">
            Your Question
            <span className="text-red-500">*</span>
          </p>
          <textarea rows="4" cols="50" className="w-full border rounded-md border-gray-500 p-2" maxLength="1000" required />
        </div>

        <div className="yourNickname my-5">
          <p className="text-gray-500">
            What is your nickname?
            <span className="text-red-500">*</span>
          </p>
          <input type="text" className="w-full border rounded-md border-gray-500 font-xs p-2" maxLength="60" placeholder="Example: jackson11!" required />
          <small className="block text-gray-500">For privacy reasons, do not use your full name or email address</small>
        </div>

        <div className="yourEmail my-5">
          <p className="text-gray-500">
            Your email
            <span className="text-red-500">*</span>
          </p>
          <input type="email" className="w-full border rounded-md border-gray-500 p-2" maxLength="60" placeholder="Example: jackson@email.com" required />
          <small className="block text-gray-500">For authentication reasons, you will not be emailed</small>
        </div>

        <div className="submitQuestion flex justify-end mt-10">
          <button type="submit" className="object-right-bottom bg-secondary-300 hover:bg-primary-200 rounded text-white hover:text-secondary-300 p-2">Submit Question</button>
        </div>
      </form>

    </div>
  );
}

export default AddQuestionForm;
