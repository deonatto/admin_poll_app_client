import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "components/navbar/Navbar";
import Sidebar from "components/sidebar/Sidebar";
import "./Layout.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="layout-container">
      <Sidebar
        drawerWidth="220px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div style={{ flexGrow: 1 }}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
