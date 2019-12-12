import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";
// import { exportAllDeclaration } from "@babel/types";

test("render blog (title, author and likes)", () => {
  const blog = {
    title: "A 10-Step Guide To Making Your Best Technical Talk Yet",
    author: "Matthew Jones",
    likes: 25
  };

  const component = render(<SimpleBlog blog={blog} />);

  const title = component.container.querySelector(".title");
  const author = component.container.querySelector(".author");
  const likes = component.container.querySelector(".likes");

  expect(title).toHaveTextContent(blog.title);
  expect(author).toHaveTextContent(blog.author);
  expect(likes).toHaveTextContent(blog.likes);

  // component.debug();
});
