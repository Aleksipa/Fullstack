/* eslint-disable no-undef */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  // eslint-disable-next-line no-unused-vars
  let component;

  const mockHandler = jest.fn();

  const blog = {
    author: "PT Vatanen",
    title: "First blog post",
    url: "http://blog.com",
    likes: 0,
  };

  const user = {
    username: "teppo",
    name: "Teppo Testaaja",
  };

  beforeEach(() => {
    component = render(
      <Blog user={user} blog={blog} handleLikeClick={mockHandler} />
    );
  });

  test("by default title and author are rendered, but url or number of likes are not", async () => {
    const titleAndAuthor = screen.getByText("First blog post PT Vatanen");
    expect(titleAndAuthor).toBeDefined();

    const url = screen.queryByText("http://blog.com");
    expect(url).toBeNull();

    const likes = screen.queryByText("0");
    expect(likes).toBeNull();
  });

  test("clicking the button renders url and likes", async () => {
    const button = screen.getByText("view");
    userEvent.click(button);

    const url = screen.queryByText("http://blog.com");
    expect(url).toBeDefined();

    const likes = screen.queryByText("0");
    expect(likes).toBeDefined();
  });

  test("click like button twice and likes will plus two", async () => {
    const button = component.getByText("like");

    userEvent.click(button);
    userEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
