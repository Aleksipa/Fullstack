/* eslint-disable no-shadow */
/* eslint-disable no-alert */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import { initializeBlogs } from "./reducers/blogReducer";
import blogService from "./services/blogs";
import BlogList from "./components/Blogs";
import Menu from "./components/Menu";
import Users from "./components/Users";
import { initializeUsers } from "./reducers/usersReducer";
import users from "./services/users";
import User from "./components/User";
import Blog from "./components/Blog";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user?.token);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogService.setToken(user?.token);
  }, [user]);

  return (
    <Container maxWidth="lg">
      <div>
        <h2>Blog app</h2>
        <Notification />
        <Menu />
        <Routes>
          <Route path="/users/:id" element={<User users={users} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
        <Footer />
      </div>
    </Container>
  );
}

export default App;
