import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
// import { exportAllDeclaration } from "@babel/types";

const blog = {
  title: "A 10-Step Guide To Making Your Best Technical Talk Yet",
  author: "Matthew Jones",
  likes: 25,
  user: [{ username: "movd", name: "movd", id: "adsdjasjdadhahsddahushdu" }]
};

const user = {
  username: "movd",
  token: "1231231214",
  name: "movd"
};

test("only render blog details when clicking on author", () => {
  localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

  const component = render(<Blog blog={blog} />);

  // If querySelector returns null its not visible
  expect(component.container.querySelector(".blog-details")).toBeNull();
  // component.debug();

  const span = component.container.querySelector("span");
  fireEvent.click(span);

  // If div includes the text content of "25 likes"
  expect(component.container.querySelector(".blog-details")).toHaveTextContent(
    `${blog.likes} likes`
  );
  // component.debug();
});
