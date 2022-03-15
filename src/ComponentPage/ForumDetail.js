import React, { useEffect, useState } from "react";
import {
  MdOutlineForum,
  MdOutlineBookmarkAdd,
  MdOutlineBookmarkRemove,
} from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForumDetail({
  _id,
  moduleCode,
  moduleName,
  createdAt,
  post,
}) {
  let navigate = useNavigate();
  var str = createdAt;
  var res = str.substring(0, 10);

  const [showBookmark, setShowBookmark] = useState(false);

  var user = JSON.parse(sessionStorage.getItem("user"));
  var newdata = {};
  useEffect(() => {
    async function fetchUserData() {
      let response = await axios.get(`http://localhost:3000/user/${user._id}`);
      let bookmarkExist = response.data.bookmark.indexOf(`${_id}`);

      if (bookmarkExist >= 0) {
        setShowBookmark(true);
      } else {
        setShowBookmark(false);
      }
    }
    if (user) {
      fetchUserData();
    }
  }, []);

  const handleAddBookmark = () => {
    if (user) {
      newdata = { bookmarkId: _id };
      // console.log('data pass over:', newdata)
      axios.post(`http://localhost:3000/user/${user._id}/addBookmark`, newdata);
    } else {
      alert("Please Login");
      navigate("/auth", { replace: true });
    }
  };

  const handleDeleteBookmark = () => {
    newdata = { bookmarkId: _id };
    // console.log('data pass over:', newdata)

    axios.post(
      `http://localhost:3000/user/${user._id}/deleteBookmark`,
      newdata
    );
  };

  return (
    <div className="subforum-row">
      <div className="subforum-icon subforum-column center">
        <MdOutlineForum />
      </div>
      <div className="subforum-description subforum-column ">
        <h1>
          <Link to={`/forum/${_id}`}>{moduleCode}</Link>
        </h1>
        <p>{moduleName}</p>
      </div>
      <div className="subforum-icon subforum-column center">
        {showBookmark ? (
          <span style={{ cursor: "pointer" }}>
            <MdOutlineBookmarkRemove
              onClick={() => {
                handleDeleteBookmark();
                setShowBookmark(false);
              }}
            />
          </span>
        ) : (
          <span style={{ cursor: "pointer" }}>
            <MdOutlineBookmarkAdd
              onClick={() => {
                handleAddBookmark();
                setShowBookmark(true);
              }}
            />
          </span>
        )}
      </div>
      <div className="subforum-stats subforum-column center">
        <span>
          {"Module created at"}
          <br />
          {res}
        </span>
      </div>
      <div className="subforum-info subforum-column center">
        <span>
          {post.length} Posts since
          <br />
          {res}
        </span>
      </div>
    </div>
  );
}
