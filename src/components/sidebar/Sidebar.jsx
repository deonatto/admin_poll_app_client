import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ChevronRightOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  PieChartOutline,
} from "@mui/icons-material";
import "./Sidebar.css";
import { colorTokens } from "theme";

const navItems = [
  { text: "User Management", icon: null },
  { text: "Home", icon: <ShoppingCartOutlined /> },
  { text: "Customers", icon: <Groups2Outlined /> },
  { text: "Transactions", icon: <ReceiptLongOutlined /> },
  { text: "Geography", icon: <PublicOutlined /> },
  { text: "Sales", icon: null },
  { text: "Daily", icon: <TodayOutlined /> },
  { text: "Monthly", icon: <CalendarMonthOutlined /> },
  { text: "Breakdown", icon: <PieChartOutline /> },
  { text: "Dashboard", icon: null },
  { text: "Admin", icon: <AdminPanelSettingsOutlined /> },
];

const Sidebar = ({
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  //change active value every time page changes
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <nav>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            ".MuiDrawer-paper": {
              color: colorTokens.grey[700],
              backgroundColor: colorTokens.primary[100],
              boxSizing: "border-box",
              borderWidth: "2px",
              width: drawerWidth,
            },
          }}
        >
          <div style={{ width: "100%" }}>
            <div style={{ margin: "1.5rem 2rem 2rem 2.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: colorTokens.grey[700],
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <h3>VOTING APP</h3>
                </div>
              </div>
            </div>
            <List>
              {navItems.map(({ text, icon }, index) => {
                if (!icon) {
                  return (
                    <p key={index} style={{ margin: "2.25rem 0 1rem 2.5rem" }}>
                      {text}
                    </p>
                  );
                }
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${text.toLowerCase()}`);
                        setActive(text.toLowerCase());
                      }}
                      sx={{
                        backgroundColor:
                          active === text.toLowerCase()
                            ? colorTokens.primary[600]
                            : "transparent",
                        color:
                          active === text.toLowerCase()
                            ? colorTokens.primary[50]
                            : colorTokens.grey[700],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === text.toLowerCase()
                              ? colorTokens.primary[50]
                              : colorTokens.grey[700],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === text.toLowerCase() && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Drawer>
      )}
    </nav>
  );
};

export default Sidebar;
