import React, { useState, useEffect } from "react";
import axios from "axios";
import ForumDetail from "./ForumDetail";

const PersonalBookmark = () => {
  const [moduleData, setModuleData] = useState([]);
  let newData = [];
  useEffect(() => {
    var user = JSON.parse(sessionStorage.getItem("user"));
    async function fetchUserData() {
      await axios.get(`http://localhost:3000/user/${user?._id}`).then((res) => {
        res.data.bookmark.map((i) => {
          axios.get(`http://localhost:3000/module/${i}`).then((res) => {
            newData = [...newData, res.data];
            setModuleData(newData);
          });
        });
      });
    }
    fetchUserData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="subforum">
          <div className="subforum-title">
            <h1>Bookmark Modules</h1>
          </div>
          <div>
            {moduleData.map((d) => {
              return <ForumDetail key={d._id} {...d} />;
            })}
          </div>
        </div>
      </div>

      <footer>
        <span>&copy;&nbsp;SCast | All rights Reserved.</span>
      </footer>
    </div>
  );
};

export default PersonalBookmark;
