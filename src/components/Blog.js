import React, { useState } from "react";
import blogsService from "../services/blogs";
import "./Blog.css";

const Blog = ({ blog }) => {
  const [visibilityFullBlog, setVisibilityFullBlog] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleVisibilityChange = event =>
    setVisibilityFullBlog(!visibilityFullBlog);

  const handleLikeUpdate = async blog => {
    const newLikes = likes + 1;
    const updateBlog = { ...blog, likes: newLikes };
    await blogsService.like(blog.id, updateBlog);
    setLikes(newLikes);
  };

  const blogDetails = (
    <div>
      <div>
        {likes} likes{" "}
        <button onClick={() => handleLikeUpdate(blog)}>like</button>
      </div>
      <div>added by {blog.user[0].name}</div>
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
