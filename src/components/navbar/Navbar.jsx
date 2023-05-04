import React, { useState } from "react";
import "./Navbar.css";
import {
  Menu as MenuIcon,
  ArrowDropDownOutlined,
  AccountCircleRounded,
  SettingsOutlined,
  ExitToAppOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { colorTokens } from "theme";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogout } from "state/auth";

/**
This component represents the navbar.
@param {boolean} isSidebarOpen - Indicates if the sidebar is open or not.
@param {function} setIsSidebarOpen - Sets the state of the sidebar.
*/

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  // State for managing the Menu component of the user avatar.
  const [anchorEl, setAnchorEl] = useState(null);
  // Boolean state for determining if the Menu is open or not.
  const isOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Selector for retrieving the userId from the auth state.
  const userId = useSelector((state) => state.auth.userId);

  //handler for opening the user avatar menu.
  const clickhandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //handler for closing the user avatar menu.
  const closeHandler = () => {
    setAnchorEl(null);
  };

  const logOutHandler = () => {
    dispatch(setLogout());
  };

  return (
    <div
      className="navbar-container"
      style={{ backgroundColor: colorTokens.primary[100] }}
    >
      <div className="left-navbar">
        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <MenuIcon sx={{ color: colorTokens.grey[500] }} />
        </IconButton>
      </div>
      <div className="right-navbar">
        <div className="navbar-img-container">
          <Button
            onClick={clickhandler}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textTransform: "none",
              gap: "0.2rem",
            }}
          >
            <AccountCircleRounded
              sx={{ fontSize: "50px", color: colorTokens.grey[400] }}
            />
            <ArrowDropDownOutlined
              sx={{ fontSize: "30px", color: colorTokens.grey[500] }}
            />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={closeHandler}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MenuItem onClick={() => navigate(`/profile/${userId}`)}>
              <IconButton>
                <SettingsOutlined
                  style={{ fontSize: "25px", color: colorTokens.grey[500] }}
                />
              </IconButton>
              Profile
            </MenuItem>
            <MenuItem onClick={logOutHandler}>
              <IconButton>
                <ExitToAppOutlined
                  style={{ fontSize: "25px", color: colorTokens.grey[500] }}
                />
              </IconButton>
              Log Out
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
