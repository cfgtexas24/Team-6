import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import EmployerNavBar from "../components/EmployerNavBar";
import { useNavigate } from "react-router-dom";

// Employer Dashboard
const EmployerHome: React.FC = () => {
  const navigate = useNavigate(); // Navigation for buttons

  return (
    <>
      <EmployerNavBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Employer Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 4 }}>
          Key insights and tools to manage your recruitment process.
        </Typography>

        <Grid container spacing={4}>
          {/* Key Insights */}
          <Grid item xs={12}>
            <Grid container spacing={4}>
              {/* Total Job Postings */}
              <Grid item xs={12} md={4}>
                <Card
                  elevation={3}
                  sx={{ borderRadius: 2, textAlign: "center" }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      12
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Total Job Postings
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Total Applications */}
              <Grid item xs={12} md={4}>
                <Card
                  elevation={3}
                  sx={{ borderRadius: 2, textAlign: "center" }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      150
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Total Applications
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Active Applicants */}
              <Grid item xs={12} md={4}>
                <Card
                  elevation={3}
                  sx={{ borderRadius: 2, textAlign: "center" }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      25
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Active Applicants
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Applicant Search */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Applicant Search
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  Find candidates that meet your requirements using advanced
                  filters.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ ml: 2, mb: 2 }}
                  onClick={() => navigate("/employer-student-search")}
                >
                  Start Searching
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Application Management */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Application Management
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  Manage and track the status of job applications in one place.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ ml: 2, mb: 2 }}
                  onClick={() => navigate("/application-management")}
                >
                  Manage Applications
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Recent Applications */}
          <Grid item xs={12}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Recent Applications
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  View recent applications submitted by candidates.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  {/* Example recent applications */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Card sx={{ p: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          John Doe
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Software Engineer - Applied 2 days ago
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Card sx={{ p: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Jane Smith
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          UX Designer - Applied 1 day ago
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Card sx={{ p: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Alice Brown
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Data Analyst - Applied 3 hours ago
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ ml: 2, mb: 2 }}
                  onClick={() => navigate("/application-management")}
                >
                  View All Applications
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EmployerHome;
