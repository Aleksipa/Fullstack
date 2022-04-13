/* eslint-disable no-shadow */
import React from "react";
import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@material-ui/core";

function User() {
  const users = useSelector((state) => state.users);
  const match = useMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  if (!user) {
    return null;
  }

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Added blogs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.blogs?.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>{blog.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default User;
