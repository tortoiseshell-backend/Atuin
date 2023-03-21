import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@reducers/sortSlice';

function SortOptions() {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.sort.sortedBy);
  const options = [
    { label: 'Relevant', value: 'relevant' },
    { label: 'Newest', value: 'newest' },
    { label: 'Helpful', value: 'helpful' },
  ];
  const handleChange = (event) => {
    dispatch(toggle(event.target.value));
  };
  return (
    <div>
      <div>
        {'Sort by: '}
        <select value={sortBy} onChange={handleChange}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <p>
        {'Sorted by: '}
        {sortBy}
      </p>
    </div>
  );
}

export default SortOptions;
