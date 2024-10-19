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
        <ListItemIcon>{item.icon}</ListItemIcon>
        {item.label}
      </MenuItem>
    ))}
  </Menu>
);

const EmployerNavBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  // Menu items for the avatar dropdown
  const profileMenuItems = [
    { label: "Profile", to: "/profile", icon: <AccountCircleIcon /> },
    { label: "Dashboard", to: "/home-employer", icon: <DashboardIcon /> },
    { label: "Logout", to: "/", icon: <LogoutIcon /> },
  ];

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
          <Tab
            label="Applicant Search"
            component={Link}
            to="/applicant-search"
          />
          <Tab
            label="Application Management"
            component={Link}
            to="/application-management"
          />
        </Tabs>

        {/* Avatar with Profile Dropdown */}
        <Box>
          <IconButton onClick={handleOpenMenu}>
            <Avatar alt="Employer Avatar" src={stockManPhoto} />
          </IconButton>
        </Box>

        {/* Avatar Dropdown Menu */}
        <DropdownMenu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleCloseMenu}
          menuItems={profileMenuItems}
        />
      </Toolbar>
    </AppBar>
  );
};

export default EmployerNavBar;
