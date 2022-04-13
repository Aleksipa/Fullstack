/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const initializeUsers = () => async (dispatch) => {
  const users = await usersService.getAll();
  dispatch(setUsers(users));
};

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
