import React, {useState} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const Login = (props) => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/login", login)
      .then((res) => {
        console.log("SR: login success: res: ", res);
        localStorage.setItem("token", res.data.payload);

        props.history.push("/friends");
      })
      .catch((err) => {
        console.error("SR: login failed: err: ", err.message);
        localStorage.removeItem("token");
      });
  };

  return (
    <>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={login.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={login.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
