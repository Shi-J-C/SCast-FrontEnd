import { Link, useParams } from "react-router-dom";
import FileBase from "react-file-base64";
import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Post() {
  const { id, index } = useParams();
  const [module, setModule] = useState([]);
  const [post, setPost] = useState([]);
  const [reply, setReply] = useState([
    { userId: "", commentText: "", commentImage: "" },
  ]);
  const [comment, setComment] = useState([]);

  const [replyArea, setReplyArea] = useState(false);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    let temp = comment;
    temp = [...temp, reply];
    setComment(temp);
    post.comment = temp;
    console.log(post);
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
                  {data.commentImage ? (
                    <img src={`${data.commentImage}`} alt=""></img>
                  ) : (
                    ""
                  )}
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
      ) : (
        ""
      )}
    </div>
  );
}
