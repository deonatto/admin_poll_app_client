import React, { useState } from "react";
import "./Navbar.css";
import {
  Menu as MenuIcon,
  ArrowDropDownOutlined,
  AccountCircleRounded,
  SettingsOutlined
} from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { colorTokens } from "theme";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
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
      style={{ backgroundColor: colorTokens.primary[100] }}
    >
      <div className="left-navbar">
        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <MenuIcon sx={{ color: colorTokens.grey[500] }} />
        </IconButton>
      </div>
      <div className="right-navbar">
        <IconButton>
          <SettingsOutlined style={{ fontSize: "25px", color: colorTokens.grey[500] }} />
        </IconButton>
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
            <AccountCircleRounded sx={{ fontSize: "50px", color: colorTokens.grey[400] }}/>
            <ArrowDropDownOutlined sx={{ fontSize: "30px", color: colorTokens.grey[500] }} />
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
