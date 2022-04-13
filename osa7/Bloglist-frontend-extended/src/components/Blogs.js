import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import AddBlog from "./AddBlog";

function BlogList() {
  const user = useSelector((state) => state.login);

  const blogsCopy = useSelector((state) => state.blogs);
  const blogs = [...blogsCopy];

  return (
    <div>
      {user !== null && <AddBlog />}
      <Table>
        <TableBody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} {blog.author}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BlogList;
