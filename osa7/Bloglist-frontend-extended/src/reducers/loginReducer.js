/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const loggedInUserJSON = JSON.parse(
  window.localStorage.getItem("loggedBlogappUser")
);

const initialState = loggedInUserJSON || null;

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser(state, action) {
      return action.payload;
    },
    logOutUser() {
      return null;
    },
  },
});

export const login = (username, password) => async (dispatch) => {
  const user = await loginService.login({ username, password });
  dispatch(loginUser(user));
};

export const logout = () => async (dispatch) => {
  dispatch(logOutUser());
};

export const { loginUser, logOutUser } = loginSlice.actions;
export default loginSlice.reducer;
