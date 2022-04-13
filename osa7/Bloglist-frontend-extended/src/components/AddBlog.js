/* eslint-disable no-use-before-define */
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { createBlog } from "../reducers/blogReducer";

const addBlog = () => {
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const addNewBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    if (!blogObject.title || !blogObject.author || !blogObject.url) {
      dispatch(setNotification("Please fill all the fields", "error"));
      return;
    }
    dispatch(createBlog(blogObject));
    dispatch(
      setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
    );
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={addNewBlog} />
      </Togglable>
    </div>
  );
};

export default addBlog;
