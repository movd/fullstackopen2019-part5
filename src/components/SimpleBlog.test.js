import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";
// import { exportAllDeclaration } from "@babel/types";

const blog = {
  title: "A 10-Step Guide To Making Your Best Technical Talk Yet",
  author: "Matthew Jones",
  likes: 25
};

test("render blog (title, author and likes)", () => {
  const component = render(<SimpleBlog blog={blog} />);

  const title = component.container.querySelector(".title");
  const author = component.container.querySelector(".author");
  const likes = component.container.querySelector(".likes");

  expect(title).toHaveTextContent(blog.title);
  expect(author).toHaveTextContent(blog.author);
  expect(likes).toHaveTextContent(blog.likes);

  // component.debug();
});

test("clicking the like button two times calls the event handler two times", () => {
  const mockHandler = jest.fn();

  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />);

  const likeButton = component.container.querySelector("button");

  for (let i = 0; i < 2; i++) {
    fireEvent.click(likeButton);
  }

  expect(mockHandler.mock.calls.length).toBe(2);
});
