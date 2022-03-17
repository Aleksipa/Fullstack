/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { connect } from 'react-redux';
import React from 'react';
import { setFilter } from '../reducers/filterReducer';

function Filter({ setFilter }) {
  const handleChange = (event) => {
    setFilter({ filter: event.target.value });
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

export default connect(null, { setFilter })(Filter);
