import React, { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "./Logo.png";

const Nav = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: green[500],
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  const [userProfile, setUserProfile] = useState("");
  const [showAdminDashBoard, setShowAdminDashBoard] = useState(false);
  const location = useLocation();

  const logout = () => {
    sessionStorage.clear();
    setUserProfile(null);
    navigate("/", { replace: true });
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
  }, [location]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Avatar>
              <img
                style={{ width: "80px", hight: "80px" }}
                src={Logo}
                alt="Logo"
              />
            </Avatar>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate("/", { replace: true })}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              onClick={() => navigate("/about", { replace: true })}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>
            <Button
              onClick={() => navigate("/forum", { replace: true })}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Forum
            </Button>
            {showAdminDashBoard && (
              <Button
                onClick={() => navigate("/updatemodule")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Admin DashBoard
              </Button>
            )}
            {userProfile ? (
              <Button
                onClick={logout}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Log Out
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/auth", { replace: true })}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Sign Up
              </Button>
            )}
          </Box>
          {userProfile && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    {...stringAvatar(userProfile.name)}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
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
                <MenuItem
                  onClick={() =>
                    navigate(`/profile/${userProfile._id}`, { replace: true })
                  }
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Bookmark</Typography>
                </MenuItem>
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
