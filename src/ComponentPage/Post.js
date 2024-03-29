import { Link, useParams } from "react-router-dom";
import FileBase from "react-file-base64";
import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Button from "@mui/material/Button";
import axios from "axios";
import AuthorProfile from "./AuthorProfile";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Post() {
  const { id, index } = useParams();
  const [module, setModule] = useState([]);
  const [post, setPost] = useState([]);
  let navigate = useNavigate();

  const [reply, setReply] = useState({
    postId: "",
    userId: "",
    name: "",
    commentText: "",
    commentImage: "",
  });

  const [comment, setComment] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios.get(`http://localhost:3000/module/${id}`).then((res) => {
      setModule(res.data);
      setPost(res.data.post[index]);
      //changeComment(res.data.post[index].comment);
      setComment(res.data.post[index].comment);
      // console.log(post)
    });

    return () => {
      source.cancel();
    };
  }, []);

  const sendEmail = (e) => {
    axios.get(`http://localhost:3000/user/${post.userId}`).then((res) => {
      emailjs.send(
        "service_9pdromc",
        "template_7t659bh",
        {
          to_name: post.name,
          from_name: reply.name,
          reply_to: res.data.username,
        },
        "user_Y4ik86BzyllTug3YYhcRR"
      );
    });
  };

  const handleReplySubmit = (e) => {
    // e.preventDefault()
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      let temp = comment;
      reply.userId = user._id;
      reply.name = user.name;
      temp = [...temp, reply];
      setComment(temp);
      reply.postId = post._id;
      axios
        .post(`http://localhost:3000/comment/${id}/addcomment`, reply)
        .then((res) => {
          setReply({ ...reply, commentText: "" });
          sendEmail(reply);
        });
    } else {
      alert("Please sign up or sign in with us before reply.");
      navigate("/auth", { replace: true });
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <div className="navigate">
        <span>
          <Link to={"/forum"}>SCast Forum </Link> {">>"}{" "}
          <Link to={`/forum/${id}`}>{module.moduleCode}</Link> {">>"}{" "}
          {post.postTitle}
        </span>
      </div>
      {/*========================author area=========================*/}
      <div className="topic-container">
        <div className="head">
          <div className="authors">Author</div>
          <div className="content">
            {post.postType} : {post.postTitle}
          </div>
        </div>

        <div className="body">
          <div className="authors">
            <AuthorProfile {...post} />

            <div className="username">
              Posted By
              <br />
              {post.name}
              {/* <br />
              This Data and Time */}
            </div>
          </div>

          <div className="content" style={{ margin: "10px" }}>
            {post.postObjective}
            <br />
            {post.postImage ? "Image" : ""}
            <br />

            <div>
              {post.postImage ? (
                <img
                  className="img-zoom"
                  src={`${post.postImage}`}
                  alt=""
                ></img>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/*========================comment area=========================*/}
        <section style={{ paddingTop: "10px" }}>
          <div className="head">Comment</div>
          {comment.map((data, index) => (
            <div key={index}>
              <div className="body">
                <div className="authors">
                  <AuthorProfile {...data} />
                  <div className="username">
                    Posted By
                    <br />
                    {data.name}
                  </div>
                </div>

                <div className="content" style={{ margin: "10px" }}>
                  {data.commentText}
                  <br />
                  {data.commentImage ? "Image" : ""}
                  <br />
                  <div>
                    {data.commentImage ? (
                      <img
                        className="img-zoom"
                        src={`${data.commentImage}`}
                        alt=""
                      ></img>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Reply area */}
      <div>
        <form>
          <TextField
            style={{
              marginTop: "20px",
            }}
            variant="outlined"
            fullWidth
            label="Reply Box"
            id="commentText,outlined-basic"
            placeholder="reply to post... "
            type="text"
            value={reply.commentText}
            required
            onChange={(e) =>
              setReply({ ...reply, commentText: e.target.value })
            }
          />
          <div>
            {/* upload image */}
            <label>Select File</label>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setReply({ ...reply, commentImage: base64 })
              }
            ></FileBase>
          </div>
          <Button onClick={handleReplySubmit}>Submit</Button>
        </form>
      </div>
    </div>
  );
}
