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
      <form className="flex bg-white dark:bg-black border-solid border-[3px] border-secondary-300 dark:border-primary-300">
        <div className="grow">
          <input type="text" className="ml-4 w-full dark:bg-black dark:text-stone-300 h-10 outline-none" placeholder="Have a question? Search for answers..." onChange={handleChange} />
        </div>
        <i className="fa-solid fa-magnifying-glass my-auto text-secondary-300 dark:text-primary-300 px-3" />
      </form>
    </div>
  );
}

export default Search;
