import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import LockIcon from "@mui/icons-material/Lock";
import { TextField } from "@material-ui/core";
import { Paper, Container, Avatar, Typography, Button } from "@mui/material";
import { Grid } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const SignUpSignIn = () => {
  let navigate = useNavigate();
  const initialState = {
    name: "",
    username: "",
    userimage: "",
    password: "",
    confirmPassword: "",
  };
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState(initialState);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      if (form.password === form.confirmPassword) {
        let temp = {
          name: form.name,
          username: form.username,
          imageURL: form.userimage,
          password: form.password,
        };
        axios
          .post(`http://localhost:3000/user/addUser`, temp)
          .then((res) => console.log(res.data));
      } else {
        alert("Your repeat password is different!!");
      }
    } else {
      let temp = {
        username: form.username,
        password: form.password,
      };
      axios
        .post(`http://localhost:3000/user/login`, temp)
        .then((res) => {
          sessionStorage.setItem("accessToken", res.data.token);
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/", { replace: true });
        })
        .catch(function (error) {
          alert(error.response.data.message);
        });
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          style={{
            border: "solid 1px #52057b",
            marginTop: "20px",
            padding: "20px",

            justifyContent: "center",
            boxShadow: "1px 2xp 3px #52057b",
          }}
        >
          <Avatar>{isSignup ? <LockIcon /> : <LoginIcon />}</Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{ marginBottom: "10px" }}
          >
            {isSignup ? "User Sign up" : "User Sign in"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {isSignup && ( // only if signedup, show details.
                <>
                  <TextField
                    name="name"
                    label="Name"
                    value={form.name}
                    onChange={handleChange}
                    autoFocus
                  />
                </>
              )}
              <TextField
                name="username"
                label="User Name"
                value={form.username}
                onChange={handleChange}
                // type="email"
              />
              <TextField
                name="password"
                label="Password"
                value={form.password}
                onChange={handleChange}
                type="password"
              />
              {isSignup && (
                <>
                  <TextField
                    name="confirmPassword"
                    label="Repeat Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    type="password"
                  />
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setForm({ ...form, userimage: base64 })
                    }
                  ></FileBase>
                </>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>

            <Grid container alignItems="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default SignUpSignIn;
