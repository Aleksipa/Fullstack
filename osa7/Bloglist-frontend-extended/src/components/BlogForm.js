import React, { useState } from "react";
import PropTypes from "prop-types";

function BlogForm({ createBlog }) {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
  };

  return (
    <div>
      <h2>Create a new Blog</h2>

      <form onSubmit={addBlog}>
        <label htmlFor="title">
          title:
          <input
            name="title"
            type="text"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder="post title"
            id="inputTitle"
          />
        </label>
        <br />
        <label htmlFor="author">
          author:
          <input
            name="author"
            type="text"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="post author"
            id="inputAuthor"
          />
        </label>
        <br />
        <label htmlFor="url">
          url:
          <input
            name="url"
            type="text"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="post url"
            id="inputUrl"
          />
        </label>
        <br />
        <button id="submitBlogForm" type="submit">
          create
        </button>
      </form>
    </div>
  );
}

export default BlogForm;
