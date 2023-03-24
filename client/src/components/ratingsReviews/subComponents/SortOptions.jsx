import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSort } from '@reducers/sortSlice';

function SortOptions() {
  const dispatch = useDispatch();
  const sortedBy = useSelector((state) => state.sort.sortedBy);
  const options = [
    { label: 'Relevant', value: 'relevant' },
    { label: 'Newest', value: 'newest' },
    { label: 'Helpful', value: 'helpful' },
  ];
  const handleChange = (event) => {
    dispatch(toggleSort(event.target.value));
  };
  return (
    <div>
      <div>
        {'Sort by: '}
        <select value={sortedBy} onChange={handleChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <p>
        {'Sorted by: '}
        {sortedBy}
      </p>
    </div>
  );
}

export default SortOptions;
