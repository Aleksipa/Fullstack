/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';

function AnecdoteForm({ createAnecdote }) {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    createAnecdote(content);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default connect(null, { createAnecdote })(AnecdoteForm);
