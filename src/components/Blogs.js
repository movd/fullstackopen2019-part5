import React from "react";
import Blog from "./Blog";

const Blogs = ({ blogs }) => {
  return (
    <div className="Blogs">
      <h2>Blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
