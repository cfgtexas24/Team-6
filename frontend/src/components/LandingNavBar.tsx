import React from "react";
import { AppBar, Toolbar, Tabs, Tab, Button, Box } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import REE from "../assets/REE.png";

const LandingNavBar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Helper functions to handle navigation
  const handleSignUp = () => {
    navigate("/signup"); // TO: SignUp route
  };

  const handleLogin = () => {
    navigate("/login"); // TO: Login route
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(8px)", // Apply blur effect
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Light background with transparency
        transition: "background-color 0.3s ease", // Smooth transition for background color
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          <img src={REE} alt="Logo" style={{ height: "50px" }} />
        </Box>

        {/* Navigation Tabs */}
        <Tabs>
          <Tab
            label="About"
            component={ScrollLink}
            to="aboutSection"
            smooth={true}
            duration={500}
            spy={true}
            offset={-70}
          />
          <Tab
            label="Careers"
            component={ScrollLink}
            to="careersSection"
            smooth={true}
            duration={500}
            spy={true}
            offset={-70}
          />
          <Tab
            label="Education"
            component={ScrollLink}
            to="educationSection"
            smooth={true}
            duration={500}
            spy={true}
            offset={-70}
          />
        </Tabs>

        {/* Login and Sign Up Buttons */}
        <Box>
          <Button
            onClick={handleLogin}
            variant="outlined"
            sx={{
              color: "#FEC10E", // REE Yellow
              borderColor: "#FEC10E",
              "&:hover": {
                borderColor: "#E0A90C",
                color: "#E0A90C",
              },
              marginRight: "1rem",
            }}
          >
            Log In
          </Button>

          <Button
            onClick={handleSignUp}
            variant="contained"
            sx={{
              backgroundColor: "#FEC10E", // REE Yellow
              color: "#fff",
              "&:hover": {
                backgroundColor: "#E0A90C", // Darker yellow on hover
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LandingNavBar;
