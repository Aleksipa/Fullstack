import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      const { id } = action.payload;
      const anecdoteToAddVote = state.find((n) => n.id === id);
      const votedAnecdote = {
        ...anecdoteToAddVote,
        votes: anecdoteToAddVote.votes + 1,
      };
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : votedAnecdote));
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  // eslint-disable-next-line no-use-before-define
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content);
  // eslint-disable-next-line no-use-before-define
  dispatch(appendAnecdote(newAnecdote));
};

export const updateAnecdote = (anecdote) => async (dispatch) => {
  const votedaAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };
  const updatedAnecdote = await anecdoteService.update(votedaAnecdote);
  // eslint-disable-next-line no-use-before-define
  dispatch(addVote(updatedAnecdote));
};

export const {
  addVote, setAnecdotes, appendAnecdote,
} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
