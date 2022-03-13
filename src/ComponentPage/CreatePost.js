import axios from "axios";
import FileBase from "react-file-base64";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { TextField, Grid } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";

import {
  Paper,
  Container,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

export default function CreatePost() {
  const { id } = useParams();
  const [moduleCode, setModuleCode] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/module/${id}`)
      .then((res) => {
        setModuleCode(res.data.moduleCode);
      })
      .catch((err) => console.log(err.data));
  }, [moduleCode]);

  let user = JSON.parse(sessionStorage.getItem("user"));

  const url = `http://localhost:3000/post/${id}/addPost`;
  const [postData, setPostData] = useState({
    userId: user.name,
    postTitle: "",
    postImage: "",
    postObjective: "",
    postType: "",
    comment: [],
  });

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(url, postData).then((res) => console.log(res.data));
    // axios.post(url, postData)
    console.log(postData);
    alert("Create Post successfully");
  }
  return (
    <div>
      <div className="navigate">
        <span>
          <span>
            <Link to={"/forum"}>SCast Forum </Link> {">>"}{" "}
            <Link to={`/forum/${id}`}>{moduleCode}</Link> {">>"} {"New Post"}
          </span>
        </span>
      </div>

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
          <FormControl fullWidth>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label id="postType">Post Type</label>
                <Select
                  id="demo-simple-select"
                  // label="Post Type"
                  name="postType"
                  value={postData.postType}
                  onChange={handleChange}
                >
                  <MenuItem value={"Lecture Note"}>Lecture Note</MenuItem>
                  <MenuItem value={"Tutorial"}>Tutorial</MenuItem>
                  <MenuItem value={"Lab"}>Lab</MenuItem>
                </Select>
                <TextField
                  // style={{ margin: "5px" }}
                  name="postTitle"
                  label="Post Title"
                  value={postData.postTitle}
                  onChange={handleChange}
                  autoFocus
                />

                <TextField
                  id="outlined-multiline-flexible"
                  name="postObjective"
                  label="Your question"
                  multiline
                  maxRows={4}
                  value={postData.postObjective}
                  onChange={handleChange}
                  type="text"
                />

                <label>Select File</label>
                <FileBase
                  style={{ margin: "5px" }}
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPostData({ ...postData, postImage: base64 })
                  }
                ></FileBase>
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
          </FormControl>
        </Paper>
      </Container>
    </div>
  );
}
