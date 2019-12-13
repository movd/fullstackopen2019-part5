import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, waitForElement } from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";

const user = {
  username: "movd",
  token: "1231231214",
  name: "movd"
};

describe("<App />", () => {
  test("if no user logged, blogs are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("login"));

    const divLoginForm = component.container.querySelector(".LoginForm");
    expect(divLoginForm).toHaveTextContent("log in to application");
    // No Blog and Blogs please
    expect(component.container.querySelector(".Blogs")).toBeNull();
    expect(component.container.querySelector(".Blog")).toBeNull();
  });

  test("if user is loggend in, blogs are rendered", async () => {
    localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector(".Blogs"));
    // component.debug();

    const blogsDiv = component.container.querySelector(".Blogs");
    expect(blogsDiv).toHaveTextContent("TDD harms architecture");
    expect(blogsDiv).toHaveTextContent("Getting started with security keys");
  });
});
