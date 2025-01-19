const express = require("express");
const { getAsync } = require("../redis");
const router = express.Router();

router.get("/", async (_, res) => {
  const added_todos = await getAsync("added_todos");
  res.json({
    added_todos: parseInt(added_todos) || 0,
  });
});

module.exports = router;
