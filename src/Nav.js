import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Nav() {
  const [userProfile, setUserProfile] = useState("");
  const [showAdminDashBoard, setShowAdminDashBoard] = useState(false);
  const location = useLocation();

  const logout = () => {
    sessionStorage.clear();
    setUserProfile(null);
  };

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user?.role === "student") {
      async function fetchUserData() {
        let response = await axios.get(
          `http://localhost:3000/user/${user?._id}`
        );

        setUserProfile(response.data);
      }
      fetchUserData();
    }

    if (user?.role === "administrator") {
      async function fetchUserData() {
        let response = await axios.get(
          `http://localhost:3000/user/${user?._id}`
        );

        setUserProfile(response.data);
      }
      fetchUserData();
      setShowAdminDashBoard(true);
    } else {
      setShowAdminDashBoard(false);
    }

    // const token = user?.token; // check if token exists

    // JSON web token (Manual login)
    // if (token) {
    //   const decodedToken = decode(token); // check when the token expires

    //   if (decodedToken.exp * 1000 < new Date().getTime()) logout(); // logout once token expired
    // }
  }, [location]); // when location change, set the user

  return (
    <header>
      <div className="brand">SCast</div>
      <div className="navbar">
        <nav className="navigation">
          <ul className="nav-list">
            <div className="nav-item">
              {userProfile ? (
                <Link to="/" onClick={logout}>
                  Log Out
                </Link>
              ) : (
                <Link to="/auth">Sign Up</Link>
              )}
              {showAdminDashBoard && (
                <Link to="/updatemodule">Admin DashBoard</Link>
              )}

              {/* <Link to='/createmodule'>Create Module</Link> */}
              <Link to="/forum">Forum</Link>
              <Link to="/about">About</Link>
              <Link to="/">Home</Link>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}
