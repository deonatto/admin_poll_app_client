import React, { useState } from "react";
import "./Navbar.css";
import {
  Menu as MenuIcon,
  HouseOutlined,
  ArrowDropDownOutlined,
  AccountCircleRounded,
} from "@mui/icons-material";
import { Button, IconButton, InputBase, Menu, MenuItem } from "@mui/material";
import { colorTokens } from "theme";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const clickhandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeHandler = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className="navbar-container"
      style={{ backgroundColor: colorTokens.grey[0] }}
    >
      <div className="left-navbar">
        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <h2 style={{ marginLeft: "5px" }}>Voting App</h2>
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
              gap: "1rem",
            }}
          >
            <AccountCircleRounded />
            <ArrowDropDownOutlined sx={{ fontSize: "30px", color: "white" }} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={closeHandler}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MenuItem onClick={closeHandler}>Log Out</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
