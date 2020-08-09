import React, {useState} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const Login = (props) => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", login)
      .then((res) => {
        console.log("SR: login success: res: ", res);
        localStorage.setItem("authToken", res.data.payload);

        setIsLoading(true);

        props.history.push("/friends");
      })
      .catch((err) => {
        console.error("SR: login failed: err: ", err.message);
        localStorage.removeItem("authToken");
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
        <button>{isLoading ? <p>...Loading</p> : <p>Log in</p>}</button>
      </form>
    </>
  );
};

export default Login;
