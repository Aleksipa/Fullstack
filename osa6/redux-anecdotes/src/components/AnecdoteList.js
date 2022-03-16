import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { updateAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(updateAnecdote(id));
  };

  const addNotification = (anecdote) => {
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  const anecdotesForSort = [...anecdotes];

  const anecdotesToShow = () => {
    if (filter.filter === '') return anecdotesForSort;

    return anecdotesForSort
      .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.filter.toLowerCase()))
      .sort((a, b) => (a.votes > b.votes ? -1 : 1));
  };

  return (
    <div>
      {anecdotesToShow()
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has
              {' '}
              {anecdote.votes}
              <button
                button="true"
                type="button"
                onClick={() => {
                  vote(anecdote);
                  addNotification(anecdote);
                }}
              >
                vote

              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AnecdoteList;
