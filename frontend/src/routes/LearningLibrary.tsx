import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip,
  FormGroup,
  Paper,
} from "@mui/material";
import UserNavBar from "../components/UserNavBar";
import automation from "../assets/automation.jpg";
import cybersecurity from "../assets/cybersecurity.jpg";
import retail from "../assets/retail.jpg";

// Dummy course data
const courses = [
  {
    id: 1,
    title: "IT Automation with Python",
    description:
      "Learn how to automate tasks using Python, designed for IT professionals.",
    level: "Intermediate",
    type: "IT Support",
    ageRange: "16+",
    imageUrl: automation,
  },
  {
    id: 2,
    title: "Advanced Evolution in Cybersecurity",
    description:
      "Master advanced concepts in cybersecurity to protect networks from modern threats.",
    level: "Advanced",
    type: "Cybersecurity",
    ageRange: "16+",
    imageUrl: cybersecurity,
  },
  {
    id: 3,
    title: "Retail Industry Fundamentals",
    description:
      "Gain essential skills to succeed in the retail industry with a focus on customer service.",
    level: "Beginner",
    type: "Retail Industry",
    ageRange: "16-",
    imageUrl: retail,
  },
];

const LearningLibrary = () => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedAgeRange, setSelectedAgeRange] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Handle filter changes for checkboxes
  const handleCheckboxChange = (
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
  ) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  // Filter courses based on selections
  const filteredCourses = courses.filter((course) => {
    const levelMatch =
      selectedLevels.length === 0 || selectedLevels.includes(course.level);
    const ageRangeMatch =
      selectedAgeRange.length === 0 ||
      selectedAgeRange.includes(course.ageRange);
    const typeMatch =
      selectedTypes.length === 0 || selectedTypes.includes(course.type);

    return levelMatch && ageRangeMatch && typeMatch;
  });

  return (
    <>
      <UserNavBar />
      <Box display="flex" p={4}>
        {/* Filter Area */}
        <Box
          sx={{
            width: "25%",
            bgcolor: "#f5f5f5",
            p: 2,
            borderRadius: 2,
            mr: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>

          {/* Skill Level */}
          <Typography variant="subtitle1">Skill Level</Typography>
          <FormGroup>
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <FormControlLabel
                key={level}
                control={
                  <Checkbox
                    checked={selectedLevels.includes(level)}
                    onChange={() =>
                      handleCheckboxChange(
                        selectedLevels,
                        setSelectedLevels,
                        level,
                      )
                    }
                  />
                }
                label={level}
              />
            ))}
          </FormGroup>

          {/* Age Range */}
          <Typography variant="subtitle1">Age Range</Typography>
          <FormGroup>
            {["16-", "16+"].map((range) => (
              <FormControlLabel
                key={range}
                control={
                  <Checkbox
                    checked={selectedAgeRange.includes(range)}
                    onChange={() =>
                      handleCheckboxChange(
                        selectedAgeRange,
                        setSelectedAgeRange,
                        range,
                      )
                    }
                  />
                }
                label={range === "16+" ? "16 and Over" : "16 and Under"}
              />
            ))}
          </FormGroup>

          {/* Types of Courses */}
          <Typography variant="subtitle1">Types of Courses</Typography>
          <FormGroup>
            {["IT Support", "Cybersecurity", "Retail Industry"].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={selectedTypes.includes(type)}
                    onChange={() =>
                      handleCheckboxChange(
                        selectedTypes,
                        setSelectedTypes,
                        type,
                      )
                    }
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ width: "75%" }}>
          {["Beginner", "Intermediate", "Advanced"].map((level, index) => (
            <React.Fragment key={level}>
              {/* Section Divider */}
              {selectedLevels.length === 0 || selectedLevels.includes(level) ? (
                <>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      // Apply extra padding for Intermediate and Advanced levels
                      mt:
                        level === "Intermediate" || level === "Advanced"
                          ? 4
                          : 2,
                    }}
                  >
                    {level} Courses
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    {filteredCourses
                      .filter((course) => course.level === level)
                      .map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                          <Card
                            sx={{
                              position: "relative",
                              overflow: "hidden",
                              "&:hover .hover-description": {
                                opacity: 1,
                              },
                            }}
                          >
                            {/* Course Image */}
                            <CardMedia
                              component="img"
                              height="140"
                              image={course.imageUrl}
                              alt={course.title}
                            />
                            {/* Course Title */}
                            <CardContent>
                              <Typography variant="h6">
                                {course.title}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  flexWrap: "wrap",
                                }}
                              >
                                <Chip label={course.level} />
                                <Chip label={course.ageRange} />
                                <Chip label={course.type} />
                              </Box>
                            </CardContent>
                            {/* Hover Description */}
                            <Paper
                              elevation={3}
                              className="hover-description"
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                bgcolor: "rgba(0, 0, 0, 0.7)",
                                color: "#fff",
                                opacity: 0,
                                transition: "opacity 0.3s ease",
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography variant="body1" align="center">
                                {course.description}
                              </Typography>
                            </Paper>
                          </Card>
                        </Grid>
                      ))}
                  </Grid>
                </>
              ) : null}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default LearningLibrary;
