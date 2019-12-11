import loginService from "./services/login";
import blogsService from "./services/blogs";
import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState();
  const [visibilityNewBlogForm, setVisibilityNewBlogForm] = useState(false);

  const clearNotification = () => {
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async event => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      blogsService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({
        type: "error",
        message: "wrong username or password"
      });
      clearNotification();
    }
  };

  const handleLogout = event => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleUsernameChange = event => setUsername(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);
  const handleTitleChange = event => setTitle(event.target.value);
  const handleAuthorChange = event => setAuthor(event.target.value);
  const handleUrlChange = event => setUrl(event.target.value);
  const toggleVisibilityChange = event =>
    setVisibilityNewBlogForm(!visibilityNewBlogForm);

  const handleNewBlog = async event => {
    event.preventDefault();
    try {
      const addedBlog = await blogsService.create(
        { title, author, url },
        user.token
      );
      setBlogs(blogs.concat(addedBlog));
      setNotification({
        type: "success",
        message: `A new Blog ${addedBlog.title} by ${addedBlog.author} added`
      });
      clearNotification();
    } catch (error) {
      if (error.response.data.error) {
        setNotification({
          type: "error",
          message: error.response.data.error
        });
      } else {
        setNotification({
          type: "error",
          message: error.message
        });
      }

      clearNotification();
    }
  };

  const handleDeleteBlog = async blog => {
    window.confirm(`remove blog '${blog.title} by ${blog.author}`);
    const idx = blogs.findIndex(b => b.id === blog.id);
    let newBlogs = [...blogs];
    newBlogs.splice(idx, 1);
    try {
      await blogsService.remove(blog);
      setBlogs(newBlogs);
      setNotification({
        type: "success",
        message: `The Blog ${blog.title} by ${blog.author} has been deleted`
      });
      clearNotification();
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message
      });
      clearNotification();
    }
  };

  // Only GET blogs when compontents mounts or 'user' state
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getBlogs();
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  const getBlogs = async () => {
    const unsortedBlogs = await blogsService.getAll();
    const sortedBlogs = unsortedBlogs.sort((a, b) => b.likes - a.likes);
    //
    setBlogs(sortedBlogs);
  };

  const handLikeChange = async blog => {
    // Find Element Index in blogs array (state) by given id
    const idx = blogs.findIndex(b => b.id === blog.id);
    // Create copy of blogs
    let newBlogs = [...blogs];
    // 1 up for likes
    const newLikes = blogs[idx].likes + 1;
    // Update copy of blogs
    newBlogs[idx] = { ...blogs[idx], likes: newLikes };
    // Set the updated as the state
    await blogsService.like(newBlogs[idx].id, newBlogs[idx]);
    // Sort by likes
    newBlogs.sort((a, b) => b.likes - a.likes);
    setBlogs(newBlogs);
  };

  const renderBlogs = () => {
    return (
      <div className="Blogs">
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handLikeChange={() => handLikeChange(blog)}
            handleDeleteBlog={() => handleDeleteBlog(blog)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      {notification ? <Notification notification={notification} /> : null}
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          // errorMessage={errorMessage}
        />
      ) : (
        <div>
          <h2>Blogs</h2>
          <div>
            <p>
              {user.name} logged in{" "}
              <button onClick={handleLogout}>logout</button>
            </p>
          </div>
          {visibilityNewBlogForm ? (
            <div>
              <NewBlogForm
                handleNewBlog={handleNewBlog}
                handleTitleChange={handleTitleChange}
                handleAuthorChange={handleAuthorChange}
                handleUrlChange={handleUrlChange}
                title={title}
                author={author}
                url={url}
              />
              <p>
                <button onClick={toggleVisibilityChange}>cancel</button>
              </p>
            </div>
          ) : (
            <p>
              <button onClick={toggleVisibilityChange}>new blog</button>
            </p>
          )}
          {isLoading === true ? (
            <div>Loading...</div>
          ) : (
            <div>{renderBlogs()}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
