import { createSlice } from '@reduxjs/toolkit';

const initialState = { filter: '' };

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload.filter;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
