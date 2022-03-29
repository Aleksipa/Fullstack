/* eslint-disable no-alert */
import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((b) => setBlogs(b));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const u = JSON.parse(loggedUserJSON);
      blogService.setToken(u.token);
      setUser(u);
    }
  }, []);

  const notifyWith = (message, type = "success") => {
    setNotificationMessage({ message, type });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (username === "" || password === "") {
      notifyWith("Username and password are required", "error");
      return;
    }

    try {
      const u = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(u));
      blogService.setToken(u.token);
      setUser(u);
    } catch (exception) {
      notifyWith("Wrong credentials", "error");
    }
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    if (!blogObject.title || !blogObject.author || !blogObject.url) {
      notifyWith("Please fill all the fields", "error");
      return;
    }
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      notifyWith(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
    });
  };

  const addLike = (newBlog) => {
    blogService.update(newBlog).then((returnedBlog) => {
      setBlogs(blogs.map((b) => (b.id !== newBlog.id ? b : returnedBlog)));
    });
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const blogForm = () => (
    <Togglable buttonLabel="new Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const handleLikeClick = (blog) => {
    if (blog !== undefined) {
      const newBlog = { ...blog, likes: blog.likes + 1 };
      addLike(newBlog);
    }
  };

  const handleRemove = async (blog) => {
    try {
      const blogToRemove = blogs.filter((b) => b.id === blog.id);
      // eslint-disable-next-line no-alert
      if (
        window.confirm(
          `Remove ${blogToRemove[0].title} by ${blogToRemove[0].author}`
        )
      ) {
        await blogService.deleteBlog(blog);

        setBlogs(blogs.filter((b) => b.id !== blog.id));
      }
    } catch (err) {
      notifyWith("Removal failed", "error");
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notificationMessage} />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <div>
          {user.name} logged-in
          <button
            style={{ margin: "10px", marginBottom: "20px", marginRight: "5px" }}
            type="button"
            onClick={handleLogOut}
          >
            Logout
          </button>
          {blogForm()}
          <div style={{ marginTop: "20px" }}>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  handleLikeClick={handleLikeClick}
                  handleRemove={handleRemove}
                  blog={blog}
                  user={user}
                />
              ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
