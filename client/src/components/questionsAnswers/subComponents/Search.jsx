import React from 'react';
import { useDispatch } from 'react-redux';
import { search } from '@reducers/qnaSlice';

function Search() {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(search(e.target.value));
  };

  return (
    <div id="searchbar" className="m-4">
      <form className="flex bg-white border-solid border-[3px] border-violet-700">
        <div className="grow">
          <input type="text" className="ml-4 w-full h-10 outline-none text-gray-500" placeholder="Have a question? Search for answers..." onChange={handleChange} />
        </div>
        <i className="fa-solid fa-magnifying-glass my-auto text-violet-700 px-3" />
      </form>
    </div>
  );
}

export default Search;
