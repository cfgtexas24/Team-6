import React from "react";
import { AppBar, Toolbar, Tabs, Tab, Button, Box } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import REE from "../assets/REE.png";

const LandingNavbar = () => {
  return (
    // bug: sticky is not making the NavBar stay absolute
    <AppBar position="sticky" color="transparent" elevation={0}>
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
            to="homeSection"
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
          <Tab
            label="Careers"
            component={ScrollLink}
            to="careersSection"
            smooth={true}
            duration={500}
            spy={true}
            offset={-70}
          />
        </Tabs>

        {/* Login and Sign Up Buttons */}
        <Box>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{
              color: "#FEC10E", // REE Yellow
              borderColor: "#FEC10E", // Outline color
              "&:hover": {
                borderColor: "#E0A90C", // Darker outline on hover
                color: "#E0A90C", // Matching text color on hover
              },
              marginRight: "1rem",
            }}
          >
            Log In
          </Button>

          <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{
              backgroundColor: "#FEC10E", // REE Yellow
              color: "#fff", // White, text color
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

export default LandingNavbar;
