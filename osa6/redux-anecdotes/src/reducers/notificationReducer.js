/* eslint-disable no-use-before-define */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { message: '' };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      state.message = action.payload;
    },
    removeNotification(state) {
      state.message = '';
    },
  },
});

export const setNotification = (message, delay) => async (dispatch) => {
  dispatch(createNotification(message));
  setTimeout(() => {
    dispatch(removeMessage());
  }, delay * 1000);
};

export const removeMessage = () => async (dispatch) => {
  dispatch(removeNotification());
};

export const { createNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
