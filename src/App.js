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

  const handleUsernameChange = event => setUsername(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  // Only GET blogs when compontents mounts or 'user' state
  useEffect(() => {
    setIsLoading(true);
    getBlogs();
    setIsLoading(false);
  }, [user]);

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
          <p>{user.name} logged in</p>
          {isLoading === true ? <div>Loading...</div> : <Blogs blogs={blogs} />}
        </div>
      )}
    </div>
  );
};

export default App;
