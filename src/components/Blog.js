import React, { useState } from "react";
import blogsService from "../services/blogs";
import "./Blog.css";

const Blog = ({ blog }) => {
  const [visibilityFullBlog, setVisibilityFullBlog] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleVisibilityChange = event =>
    setVisibilityFullBlog(!visibilityFullBlog);

  const handleLikeUpdate = async blog => {
    let newLikes = likes + 1;
    // My Backend only accepts likes via PUT
    await blogsService.like(blog.id, newLikes);
    setLikes(newLikes);
  };

  const blogDetails = (
    <div>
      <div>
        {likes} likes{" "}
        <button onClick={() => handleLikeUpdate(blog)}>like</button>
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
