/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      const newState = state.filter((blog) => blog.id !== action.payload);
      return newState;
    },
    updateBlog(state, action) {
      const stateFilter = state.filter((s) => s.id !== action.payload.id);
      const newState = [...stateFilter, action.payload];
      return newState;
    },
    newComment(state, action) {
      const blog = state.find((blog) => blog.id === action.payload.postId);

      const { id } = action.payload;
      const { content } = action.payload;
      const commentToAdd = { content, id };

      const updatedBlog = {
        ...blog,
        comments: [...blog.comments, commentToAdd],
      };

      return state.map((blog) =>
        blog.id !== action.payload.postId ? blog : updatedBlog
      );
    },
  },
});

export const createBlog = (content) => async (dispatch) => {
  const newBlog = await blogService.create(content);
  dispatch(appendBlog(newBlog));
};

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const remove = (blog) => async (dispatch) => {
  await blogService.deleteBlog(blog);
  dispatch(removeBlog(blog.id));
};

export const addLike = (blog) => async (dispatch) => {
  await blogService.update(blog);
  dispatch(updateBlog(blog));
};

export const addComment = (comment, postId) => async (dispatch) => {
  const commentToAdd = await blogService.addComment(comment, postId);
  const commentWithId = {
    ...commentToAdd,
    postId,
  };
  dispatch(newComment(commentWithId));
};

export const { setBlogs, appendBlog, removeBlog, updateBlog, newComment } =
  blogSlice.actions;
export default blogSlice.reducer;
