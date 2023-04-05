import React, { useState } from "react";
import "./Navbar.css";
import {
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { Button, IconButton, InputBase, Menu, MenuItem } from "@mui/material";

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
    <div className="navbar-container">
      <div className="left-navbar">
        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
      </div>
      <div className="right-navbar">
        <IconButton>
          <SettingsOutlined style={{ fontSize: "25px", color: "white" }} />
        </IconButton>
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
