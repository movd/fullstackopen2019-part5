import React, { useState } from "react";
import "./Blog.css";
const Blog = ({ blog }) => {
  const [visibilityFullBlog, setVisibilityFullBlog] = useState(false);

  const toggleVisibilityChange = event =>
    setVisibilityFullBlog(!visibilityFullBlog);

  const blogDetails = (
    <div>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => console.log("clicked")}>like</button>
      </div>
      <div>added by {blog.author}</div>
    </div>
  );

  return (
    <div className="Blog">
      <a title={blog.title} href={blog.url}>
        {blog.title}
      </a>{" "}
      by <span onClick={toggleVisibilityChange}>{blog.author}</span>
      {visibilityFullBlog ? blogDetails : null}
    </div>
  );
};

export default Blog;
