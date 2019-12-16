import React from "react";

const LoginForm = ({ handleLogin, username, password }) => {
  return (
    <div className="LoginForm">
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username} name="Username" />
        </div>
        <div>
          password
          <input {...password} autoComplete="on" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
