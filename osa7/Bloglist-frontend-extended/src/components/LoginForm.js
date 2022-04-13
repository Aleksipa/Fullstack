import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { setNotification } from "../reducers/notificationReducer";
import { login } from "../reducers/loginReducer";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (username === "" || password === "") {
      dispatch(setNotification("Username and password are required", "error"));
      return;
    }

    try {
      dispatch(login(username, password));
      navigate("/");
    } catch (err) {
      dispatch(setNotification("Wrong credentials", "error"));
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            value={username}
            onChange={handleUserNameChange}
            id="username"
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id="password"
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
