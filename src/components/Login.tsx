import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
<<<<<<< HEAD
=======
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./login.css"
>>>>>>> main

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target) return;
    setCredentials({
      ...credentials,
      [event.target!.name]: event.target!.value,
    });
  };

  const loginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });

      dispatch(setUser(response.data));
    }
    navigate("/");
  };

  const attemptLogin = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios.post("/api/auth", credentials);
    const token = response.data;
    window.localStorage.setItem("token", token);
    console.log("token", token);

    loginWithToken();
  };

  return (
    <div className="login">
      <Typography variant="h4" align="center" margin="20px">
        Login
      </Typography>
<<<<<<< HEAD
      <Box
        component="form"
        onSubmit={attemptLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box margin={1}>
          <TextField
            name="email"
            type="email"
            label="Email*"
            variant="outlined"
            sx={{ width: "350px" }}
            value={credentials.email}
            onChange={onChange}
          />
=======
        <Box
          component="form"
          onSubmit={attemptLogin}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            // justifyContent: "center",
            background: "transparent",
          }}
          >
          <Box margin={1}>
            <TextField
              name="email"
              type="email"
              label="Email*"
              variant="outlined"
              sx={{ width: "350px" }}
              value={credentials.email}
              onChange={onChange}
            />
          </Box>
          <Box margin={1}>
            <TextField
              name="password"
              type="password"
              label="Password*"
              variant="outlined"
              sx={{ width: "350px" }}
              value={credentials.password}
              onChange={onChange}
              />
          </Box>
          <button>Login</button>
          <div>
            Don't have an account yet? Create one{" "}
            <Link to="/createaccount">here!</Link>
          </div>
>>>>>>> main
        </Box>
    </div>
  );
};

export default Login;
