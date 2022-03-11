import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@material-ui/core";
import { Paper, Container, Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";

const Profile = () => {
  const initialState = {
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [userProfile, setUserProfile] = useState(initialState);

  const [changePassword, setChangePassword] = useState(false);
  const { id } = useParams();

  const handleChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userProfile);
  };

  useEffect(() => {
    async function fetchUserData() {
      let response = await axios.get(`http://localhost:3000/user/${id}`);

      setUserProfile({
        ...userProfile,
        name: response.data.name,
        username: response.data.username,
        password: response.data.password,
      });
    }
    fetchUserData();
  }, []);

  return (
    <div>
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
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <TextField
                name="name"
                label="Name"
                value={userProfile.name}
                onChange={handleChange}
                autoFocus
              />

              <TextField
                name="username"
                label="User Name"
                value={userProfile.username}
                onChange={handleChange}
                // type="email"
              />

              {changePassword && (
                <>
                  <TextField
                    name="password"
                    label="Password"
                    value={userProfile.password}
                    onChange={handleChange}
                    type="password"
                  />
                  <TextField
                    name="confirmPassword"
                    label="Repeat Password"
                    value={userProfile.confirmPassword}
                    onChange={handleChange}
                    type="password"
                  />
                </>
              )}
              <FormControlLabel
                control={<Checkbox />}
                onChange={() => setChangePassword(!changePassword)}
                label="Change password"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={() => handleSubmit}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Profile;
