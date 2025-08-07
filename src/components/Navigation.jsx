import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import ConfirmDialog from "./ConfirmDialog";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Store", path: "/store" },
  { label: "Profile", path: "/profile" },
];

const Navigation = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { dispatch } = useContext(AuthContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const currentTab = navItems.findIndex((item) => item.path === location.pathname);

  const handleTabChange = (event, newValue) => {
    navigate(navItems[newValue].path);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    dispatch({ type: "LOGOUT" });
    setLogoutDialogOpen(false);
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#0cb085",
          height: '100px',
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#fff",
              userSelect: "none",
            }}
            onClick={() => navigate("/dashboard")}
          >
            <img
              src="/logo192.png"
              alt="Logo"
              style={{ height: 60, marginRight: 8 }}
            />
            A.M POS
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isMobile ? (
              <>
                <IconButton edge="end" color="inherit" onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={toggleDrawer}
                  PaperProps={{
                    sx: { backgroundColor: "#002218", color: "#0cb085" },
                  }}
                >
                  <List>
                    {navItems.map((item) => (
                      <ListItem
                        button
                        key={item.label}
                        onClick={() => {
                          navigate(item.path);
                          setDrawerOpen(false);
                        }}
                        selected={location.pathname === item.path}
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "#0cb085",
                            color: "#002218",
                          },
                        }}
                      >
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                    <ListItem button onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1 }} />
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Drawer>
              </>
            ) : (
              <>
                <Tabs
                  value={currentTab === -1 ? false : currentTab}
                  onChange={handleTabChange}
                  textColor="inherit"
                  TabIndicatorProps={{
                    children: (
                      <motion.div
                        layoutId="tab-indicator"
                        style={{
                          height: 3,
                          borderRadius: 3,
                          backgroundColor: "#ffffffff",
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    ),
                  }}
                  sx={{
                    "& .MuiTabs-flexContainer": {
                      justifyContent: "space-around",
                      gap: "1rem",
                    },
                    "& .MuiTab-root": {
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "#000000ff",
                      paddingLeft: 2,
                      paddingRight: 2,
                      "&.Mui-selected": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  {navItems.map((item) => (
                    <Tab key={item.label} label={item.label} />
                  ))}
                </Tabs>

                <Button
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    backdropFilter: "blur(6px)",
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                    color: "#a70303ff",
                    fontWeight: "bold",
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(196, 3, 3, 1)",
                      color: "#fff",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <ConfirmDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={confirmLogout}
        message="Are you sure you want to logout?"
      />
    </>
  );
};

export default Navigation;
