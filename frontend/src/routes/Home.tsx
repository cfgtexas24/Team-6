import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import UserNavBar from "../components/UserNavBar";
import { useNavigate } from "react-router-dom";

// Home Dashboard for the user
const Home: React.FC = () => {
  const navigate = useNavigate(); // For navigation to different sections

  return (
    <>
      <UserNavBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 4 }}>
          Explore the features below to enhance your career journey.
        </Typography>

        <Grid container spacing={4}>
          {/* Job Board */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Internal Job Board
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  Discover job opportunities tailored for your skills and
                  interests.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ ml: 2, mb: 2 }}
                  onClick={() => navigate("/jobs")}
                >
                  Explore Jobs
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Learning Library */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Learning Library
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  Access a variety of courses to upskill and expand your
                  knowledge.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ ml: 2, mb: 2 }}
                  onClick={() => navigate("/learning-library")}
                >
                  Start Learning
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Community Forums */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Community Forums
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  Join conversations with peers, share insights, and get advice.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ ml: 2, mb: 2 }}
                  onClick={() => navigate("/community-forums")}
                >
                  Join Discussions
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Career Resources */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Resume Review
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  Access our AI resume review services!
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ ml: 2, mb: 2 }}
                  onClick={() => navigate("/resume-review")}
                >
                  Explore Resources
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Job Tracking */}
          <Grid item xs={12}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Job Application Tracking
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  Keep track of your job applications and progress.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ ml: 2, mb: 2 }}
                  onClick={() => navigate("/track-applications")}
                >
                  View Job Tracker
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
