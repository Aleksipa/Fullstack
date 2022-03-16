import { useDispatch } from 'react-redux';
import React from 'react';
import { setFilter } from '../reducers/filterReducer';

function Filter() {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter({ filter: event.target.value }));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter
      {' '}
      <input onChange={handleChange} />
    </div>
  );
}

export default Filter;
