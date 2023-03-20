import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, search } from '../../../reducers/qnaSlice.js'

const Search = () => {
  const { query } = useSelector((state) => state.qna);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault;
    dispatch(setQuery(e.target.value))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(search(query))
  }

  return (
    <div className="m-5">
      <form className="flex border-solid border-[3px] border-violet-700" onSubmit={handleSubmit}>
        <div className="grow">
          <input type="search" className="ml-4 w-full h-10 outline-none text-gray-500" onChange={handleChange} />
        </div>
        <button className="rounded-full bg-violet-700 text-white px-2">Search</button>
      </form>
    </div>
  )
}

export default Search;
