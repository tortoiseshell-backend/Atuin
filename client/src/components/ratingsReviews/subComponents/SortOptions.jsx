import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSort } from '@reducers/sortSlice';

function SortOptions() {
  const dispatch = useDispatch();
  const sortedBy = useSelector((state) => state.sort.sortedBy);
  const options = [
    { label: 'Relevance', value: 'relevant' },
    { label: 'Newest', value: 'newest' },
    { label: 'Helpful', value: 'helpful' },
  ];
  const handleChange = (event) => {
    dispatch(toggleSort(event.target.value));
  };
  return (
    <div>
      <div>
        <select className="bg-white dark:text-white dark:bg-stone-700 mb-[10px] p-[2px] rounded-md text-lg" value={sortedBy} onChange={handleChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SortOptions;
