import loginService from "./services/login";
import blogsService from "./services/blogs";
import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

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
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = event => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleUsernameChange = event => setUsername(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  // Only GET blogs when compontents mounts or 'user' state
  useEffect(() => {
    setIsLoading(true);
    getBlogs();
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log(`${user.username} is logged in with token: ${user.token}`);
    }
  }, []);

  const getBlogs = async () => {
    setBlogs(await blogsService.getAll());
  };

  return (
    <div className="App">
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          errorMessage={errorMessage}
        />
      ) : (
        <div>
          <div>
            <p>
              {user.name} logged in{" "}
              <button onClick={handleLogout}>logout</button>
            </p>
          </div>
          {isLoading === true ? <div>Loading...</div> : <Blogs blogs={blogs} />}
        </div>
      )}
    </div>
  );
};

export default App;
