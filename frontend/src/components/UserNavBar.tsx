import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import REE from "../assets/REE.png";
import stockManPhoto from "../assets/stockManPhoto.jpg";

const DropdownMenu = ({
  anchorEl,
  open,
  onClose,
  menuItems,
}: {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  menuItems: { label: string; to: string; icon: React.ReactNode }[];
}) => (
  <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
    {menuItems.map((item, index) => (
      <MenuItem key={index} component={Link} to={item.to}>
        {/* Add the ListItemIcon for the icon */}
        <ListItemIcon>{item.icon}</ListItemIcon>
        {item.label}
      </MenuItem>
    ))}
  </Menu>
);

const UserNavBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [currentMenu, setCurrentMenu] = useState<
    "education" | "career" | "profile" | null
  >(null);

  const handleOpenMenu =
    (menuType: "education" | "career" | "profile") =>
    (event: React.MouseEvent<HTMLElement>) => {
      setMenuAnchor(event.currentTarget);
      setCurrentMenu(menuType);
    };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setCurrentMenu(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const menuConfig = {
    education: [
      { label: "Learning Library", to: "/learning-library", icon: null },
      { label: "Community Forums", to: "/community-forums", icon: null },
    ],
    career: [
      { label: "Resume Review", to: "/resume-review", icon: null },
      { label: "Track Applications", to: "/track-applications", icon: null },
      { label: "Talk to an Alumni", to: "/talk-to-alumni", icon: null },
    ],
    profile: [
      { label: "Profile", to: "/profile", icon: <AccountCircleIcon /> },
      { label: "Dashboard", to: "/dashboard", icon: <DashboardIcon /> },
      { label: "Logout", to: "/logout", icon: <LogoutIcon /> },
    ],
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        transition: "background-color 0.3s ease",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          <img src={REE} alt="Logo" style={{ height: "50px" }} />
        </Box>

        {/* Navigation Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#FEC10E",
            },
            "& .MuiTab-root": {
              color: "#000",
            },
            "& .Mui-selected": {
              color: "#FEC10E",
            },
          }}
        >
          <Tab label="Job Board" component={Link} to="/jobs" />
          <Tab
            label="Education Resources"
            onClick={handleOpenMenu("education")}
          />
          <Tab label="Career Resources" onClick={handleOpenMenu("career")} />
        </Tabs>

        {/* Avatar with Profile Dropdown */}
        <Box>
          <IconButton onClick={handleOpenMenu("profile")}>
            <Avatar alt="User Avatar" src={stockManPhoto} />
          </IconButton>
        </Box>

        {/* Menus */}
        {currentMenu && (
          <DropdownMenu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleCloseMenu}
            menuItems={menuConfig[currentMenu]}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default UserNavBar;
