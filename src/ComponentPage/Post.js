import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Post() {
  const { id, index } = useParams();
  const [module, setModule] = useState([]);
  const [post, setPost] = useState([]);
  const [reply, setReply] = useState([]);
  const [comment, setComment] = useState([]);

  const [replyArea, setReplyArea] = useState(false);

  const handleReply = (e) => {
    e.preventDefault();
    console.log(comment);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setReply(e.target.value);
  };

  // const changeComment = (comments) => {
  //   setComment(comments);
  // };

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios.get(`http://localhost:3000/module/${id}`).then((res) => {
      setModule(res.data);
      setPost(res.data.post[index]);
      //changeComment(res.data.post[index].comment);
      setComment(res.data.post[index].comment);
    });

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div>
      <div className="navigate">
        <span>
          <Link to={"/forum"}>SCast Forum - Forum</Link> {">>"}{" "}
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
          <div className="postreply">
            <button
              onClick={() => {
                setReplyArea(!replyArea);
              }}
            >
              Post Reply
            </button>
          </div>
        </div>

        <div className="body">
          <div className="authors">
            <img
              src="https://cdn.pixabay.com/photo/2014/04/05/13/05/boy-317041__340.jpg"
              alt=""
            ></img>
            <div className="username">
              Posted By
              <br />
              {post.userId}
              {/* <br />
              This Data and Time */}
            </div>
          </div>

          <div className="content">
            {post.postObjective}
            <br />
            {post.postImage ? "Image" : ""}
            <br />
            {post.postImage ? <img src={`${post.postImage}`} alt=""></img> : ""}
            {/* <hr />
            Regards {post.userId} */}
          </div>
        </div>

        {/*========================comment area=========================*/}
        <section>
          {comment.map((data, index) => (
            <div key={index}>
              <div className="head">Comment</div>
              <div className="body">
                <div className="authors">
                  <img
                    src="https://cdn.pixabay.com/photo/2014/04/05/13/05/boy-317041__340.jpg"
                    alt=""
                  ></img>
                  <div className="username">
                    Posted By
                    <br />
                    {data.userId}
                  </div>
                </div>

                <div className="content">
                  {data.commentText}
                  <br />
                  {data.commentImage ? "Image" : ""}
                  <br />
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Reply area */}
      {replyArea ? (
        <div>
          <form>
            <TextField
              style={{
                background: "white",
              }}
              name="reply"
              id=""
              placeholder="reply to post... "
              onChange={handleChange}
            />
            <Button onClick={handleReply}>click me</Button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
