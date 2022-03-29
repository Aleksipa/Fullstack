import React, { useState } from "react";

function Blog({ blog, handleLikeClick, handleRemove, user }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [detailsVisible, setdetailsVisible] = useState(false);

  const hideWhenVisible = { display: detailsVisible ? "none" : "" };
  const showWhenVisible = { display: detailsVisible ? "" : "none" };

  return (
    <div style={blogStyle} className="blog" data-cy="blog">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button
          style={{ marginLeft: "10px" }}
          type="button"
          onClick={() => setdetailsVisible(true)}
        >
          view
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button
          style={{ marginLeft: "10px" }}
          type="button"
          onClick={() => setdetailsVisible(false)}
        >
          hide
        </button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button
          style={{ marginLeft: "10px" }}
          type="button"
          onClick={() => handleLikeClick(blog)}
        >
          like
        </button>
        <br />
        {user.name}
        <br />
        {blog.user?.username === user.username && (
          <button type="button" onClick={() => handleRemove(blog)}>
            remove
          </button>
        )}
      </div>
    </div>
  );
}

export default Blog;
