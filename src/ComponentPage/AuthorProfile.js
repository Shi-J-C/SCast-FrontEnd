import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import axios from "axios";

const AuthorProfile = ({ userId }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [profile, setProfile] = useState([]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    async function fetchUserData() {
      await axios.get(`http://localhost:3000/user/${userId}`).then((res) => {
        setProfile(res.data);
      });
    }
    fetchUserData();
  }, [userId]);

  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Profile">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <img
              src="https://cdn.pixabay.com/photo/2014/04/05/13/05/boy-317041__340.jpg"
              alt=""
            ></img>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "133px", ml: "-20px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <div style={{ margin: "5px" }}>
            <Typography textAlign="center">
              User Name: {profile.name}
            </Typography>
            <hr />
            <Typography textAlign="center">
              Email: {profile.username}
            </Typography>
            <hr />
            <Typography textAlign="center">
              Phone Number: {profile.phoneNo}
            </Typography>
            <hr />
            <Typography textAlign="center">
              Telegram: {profile.telegramId}
            </Typography>
          </div>
        </Menu>
      </Box>
    </div>
  );
};

export default AuthorProfile;
