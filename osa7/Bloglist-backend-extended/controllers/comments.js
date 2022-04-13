/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const commentsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Comment = require("../models/comments");
const Blog = require("../models/blog");

commentsRouter.get("/:id/comments", async (request, response) => {
  const { id } = request.params;
  const blogComments = await Blog.findById(id).populate("comments");
  response.json(blogComments);
});

commentsRouter.post("/:id/comments", async (request, response) => {
  const { body } = request;
  console.log({ body });

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const { id } = request.params;

  const blog = await Blog.findById(id);

  const comment = new Comment({
    content: body.content,
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();
  response.status(201).json(savedComment.toJSON());
});

module.exports = commentsRouter;
