import loginService from "./services/login";
import blogsService from "./services/blogs";
import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
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
    setBlogs(await blogsService.getAll());
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
          {isLoading === true ? <div>Loading...</div> : <Blogs blogs={blogs} />}
        </div>
      )}
    </div>
  );
};

export default App;
