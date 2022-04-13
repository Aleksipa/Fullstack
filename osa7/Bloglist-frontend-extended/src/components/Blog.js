/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React, { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@material-ui/core";
import { addLike, remove, addComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

function Blog() {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const handleLikeClick = async (blog) => {
    if (blog !== undefined) {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      dispatch(addLike(updatedBlog));
    }
  };

  const handleRemove = async (blog) => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
        dispatch(remove(blog));
        navigate("/");
      }
    } catch (err) {
      dispatch(setNotification("Removal failed", "error"));
    }
  };

  const addNewComment = async (event) => {
    event.preventDefault();
    const comment = {
      content: newComment,
    };
    const postId = blog.id;
    dispatch(addComment(comment, postId));
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog" data-cy="blog">
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {blog.title} {blog.author}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <a href={blog.url}>{blog.url}</a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {blog.likes} likes
                {user !== null && (
                  <button
                    style={{ marginLeft: "10px" }}
                    type="button"
                    onClick={() => handleLikeClick(blog)}
                  >
                    like
                  </button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                added by {blog.user?.name}
                {blog.user?.username === user?.username && (
                  <button
                    style={{ marginLeft: "10px" }}
                    type="button"
                    onClick={() => handleRemove(blog)}
                  >
                    remove
                  </button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h3>comments</h3>
        {user !== null && (
          <form onSubmit={addNewComment}>
            <div>
              <input
                type="text"
                name="comment"
                onChange={({ target }) => setNewComment(target.value)}
              />
              <button type="submit">add comment</button>
            </div>
          </form>
        )}
        <div>
          <ul>
            {blog.comments?.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Blog;
