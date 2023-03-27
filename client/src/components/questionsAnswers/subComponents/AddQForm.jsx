import React from 'react';
import { useSelector } from 'react-redux';

function AddQForm() {
  const { name } = useSelector((state) => state.product);
  return (
    <div className="m-5">
      <h3 className="text-xl font-bold text-gray-500">Ask Your Question</h3>
      <h5 className="font-semibold text-gray-500">
        about the&nbsp;
        {name}
      </h5>
      <form className="m-10">
        <div className="yourQuestion my-5">
          <p className="text-gray-500">
            Your Question
            <span className="text-red-500">*</span>
          </p>
          <textarea rows="4" cols="50" className="w-full border rounded-md border-gray-500" maxLength="1000" />
        </div>
        <div className="yourNickname my-5">
          <p className="text-gray-500">
            What is your nickname?
            <span className="text-red-500">*</span>
          </p>
          <input type="text" className="w-full border rounded-md border-gray-500 font-xs" maxLength="60" placeholder="Example: jackson11!" />
          <small className="block text-gray-500">For privacy reasons, do not use your full name or email address</small>
        </div>
        <div className="yourEmail my-5">
          <p className="text-gray-500">
            Your email
            <span className="text-red-500">*</span>
          </p>
          <input type="email" className="w-full border rounded-md border-gray-500" maxLength="60" placeholder="Example: jackson@email.com" />
          <small className="block text-gray-500">For authentication reasons, you will not be emailed</small>
        </div>
        <div className="flex justify-end mt-10">
          <button type="button" className="object-right-bottom bg-secondary-300 rounded text-white p-2">Submit Question</button>
        </div>
      </form>
    </div>
  );
}

export default AddQForm;
