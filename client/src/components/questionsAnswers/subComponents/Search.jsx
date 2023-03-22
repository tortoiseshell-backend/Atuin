import React from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../../../reducers/qnaSlice';

function Search() {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(search(e.target.value));
  };

  return (
    <div className="m-5">
      <form className="flex border-solid border-[3px] border-violet-700">
        <div className="grow">
          <input type="search" className="ml-4 w-full h-10 outline-none text-gray-500" placeholder="Have a question? Search for answers..." onChange={handleChange} />
        </div>
        <button type="button" className="rounded-full border-solid bg-violet-700 text-white px-2">Search</button>
      </form>
    </div>
  );
}

export default Search;
