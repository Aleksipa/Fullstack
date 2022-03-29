/* eslint-disable no-undef */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("a new blog can be created through form", () => {
  const newBlog = jest.fn();

  const component = render(<BlogForm createBlog={newBlog} />);

  const sendButton = component.getByText("create");

  const inputTitle = component.getByPlaceholderText("post title");
  const inputAuthor = component.getByPlaceholderText("post author");
  const inputUrl = component.getByPlaceholderText("post url");

  userEvent.type(inputTitle, "Uudet lisäravinteet vol");
  userEvent.type(inputAuthor, "PT Vatanen");
  userEvent.type(inputUrl, "http://jotain.com");
  userEvent.click(sendButton);

  expect(newBlog.mock.calls).toHaveLength(1);
  expect(newBlog.mock.calls[0][0].title).toBe("Uudet lisäravinteet vol");
  expect(newBlog.mock.calls[0][0].author).toBe("PT Vatanen");
  expect(newBlog.mock.calls[0][0].url).toBe("http://jotain.com");
});
