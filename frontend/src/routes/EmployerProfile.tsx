import React, { useState } from 'react';
import { Container, Box, Typography, Button, Tabs, Tab, Avatar, Grid, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Edit, Add, PhotoCamera, Delete } from '@mui/icons-material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


interface Job {
  title: string;
  type: string;
  payRange: string;
  location: string;
  datePosted: string;
  startDate?: string;
  endDate?: string;
}

const EmployerProfilePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [jobs, setJobs] = useState<Job[]>([
    {
      title: 'Software Engineer',
      type: 'Full-Time',
      payRange: '$160-170k/yr',
      location: 'San Francisco, Remote',
      datePosted: '1 week ago',
    },
    {
      title: 'Software Engineer Intern',
      type: 'Internship',
      payRange: '$48-50/hr',
      location: 'Remote',
      datePosted: '3 days ago',
      startDate: '2025-06-01',
      endDate: '2025-08-01',
    },
  ]);
  const [editCompanyInfoOpen, setEditCompanyInfoOpen] = useState<boolean>(false);
  const [editJobOpen, setEditJobOpen] = useState<number | null>(null);
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Company Name',
    location: 'Austin, TX',
    employees: '100-200',
    status: 'Private',
    website: 'https://companywebsite.com',
    logo: '/company-logo.png'
  });
  const [aboutDescription, setAboutDescription] = useState<string>('This is a description of the company. It tells the company\'s mission, vision, and values. Here you can get to know more about what they do.');
  const [isEditingAbout, setIsEditingAbout] = useState<boolean>(false);
  const [newJobData, setNewJobData] = useState<Job | null>(null); // State to manage new job data

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleEditCompanyInfoOpen = () => {
    setEditCompanyInfoOpen(true);
  };

  const handleEditCompanyInfoClose = () => {
    setEditCompanyInfoOpen(false);
  };

  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value });
  };

  const handleAboutDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAboutDescription(e.target.value);
  };

  const toggleEditAbout = () => {
    setIsEditingAbout(!isEditingAbout);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newLogoUrl = URL.createObjectURL(e.target.files[0]);
      setCompanyInfo({ ...companyInfo, logo: newLogoUrl });
    }
  };

  const handleEditJobOpen = (index: number) => {
    setEditJobOpen(index);
    setNewJobData(null); // Clear any new job data when editing existing jobs
  };

  const handleNewJobOpen = () => {
    setEditJobOpen(jobs.length);
    setNewJobData({
      title: '',
      type: '',
      payRange: '',
      location: '',
      datePosted: 'Just now',
      startDate: '',
      endDate: ''
    });
  };

  const handleEditJobClose = () => {
    setEditJobOpen(null);
    setNewJobData(null); // Clear new job data when dialog is closed
  };

  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (index !== null && index >= 0 && index < jobs.length) {
      const updatedJobs = [...jobs];
      updatedJobs[index] = { ...updatedJobs[index], [e.target.name]: e.target.value };
      setJobs(updatedJobs);
    }
  };

  const handleNewJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (newJobData) {
      setNewJobData({ ...newJobData, [e.target.name]: e.target.value });
    }
  };

  const handleDateChange = (date: any, field: string, index: number) => {
    if (index !== null && index >= 0 && index < jobs.length) {
      const updatedJobs = [...jobs];

      if (field === 'startDate') {
        if (date && updatedJobs[index].endDate && dayjs(date).isAfter(dayjs(updatedJobs[index].endDate))) {
          alert('Start date cannot be after the end date.');
          return;
        }
        updatedJobs[index] = { ...updatedJobs[index], [field]: date ? date.toISOString() : '' };
      } else if (field === 'endDate') {
        if (date && updatedJobs[index].startDate && dayjs(date).isBefore(dayjs(updatedJobs[index].startDate))) {
          alert('End date cannot be before start date.');
          return;
        }
        updatedJobs[index] = { ...updatedJobs[index], [field]: date ? date.toISOString() : '' };
      }

      setJobs(updatedJobs);
    }
  };


  const handleNewJobDateChange = (date: any, field: string) => {
    if (newJobData) {
      setNewJobData({ ...newJobData, [field]: date ? date.toISOString() : '' });
    }
  };

  const handleDeleteJob = (index: number) => {
    if (index !== null && index >= 0 && index < jobs.length) {
      const updatedJobs = jobs.filter((_, i) => i !== index);
      setJobs(updatedJobs);
      setEditJobOpen(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        {/* Company Information Block */}
        <Box display="flex" alignItems="center" mb={4}>
          <Box position="relative" mr={2}>
            <Avatar src={companyInfo.logo} alt="Company Logo" sx={{ width: 80, height: 80 }} />
            <IconButton
              color="primary"
              component="label"
              sx={{ position: 'absolute', bottom: -10, right: -10 }}
            >
              <PhotoCamera />
              <input type="file" accept="image/*" hidden onChange={handleLogoChange} />
            </IconButton>
          </Box>
          <Box flexGrow={1}>
            <Typography variant="h4">{companyInfo.name}</Typography>
            <Typography variant="subtitle1">Location: {companyInfo.location}</Typography>
            <Typography variant="subtitle1">Employees: {companyInfo.employees}</Typography>
            <Typography variant="subtitle1">Status: {companyInfo.status}</Typography>
            <Typography variant="subtitle1"><a href={companyInfo.website}>{companyInfo.website}</a></Typography>
          </Box>
          <Button variant="outlined" startIcon={<Edit />} onClick={handleEditCompanyInfoOpen}>Edit Info</Button>
        </Box>

        <Dialog open={editCompanyInfoOpen} onClose={handleEditCompanyInfoClose}>
          <DialogTitle>Edit Company Information</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Company Name"
              name="name"
              fullWidth
              value={companyInfo.name}
              onChange={handleCompanyInfoChange}
            />
            <TextField
              margin="dense"
              label="Location"
              name="location"
              fullWidth
              value={companyInfo.location}
              onChange={handleCompanyInfoChange}
            />
            <TextField
              margin="dense"
              label="Employees"
              name="employees"
              fullWidth
              value={companyInfo.employees}
              onChange={handleCompanyInfoChange}
            />
            <TextField
              margin="dense"
              label="Status"
              name="status"
              fullWidth
              value={companyInfo.status}
              onChange={handleCompanyInfoChange}
            />
            <TextField
              margin="dense"
              label="Website"
              name="website"
              fullWidth
              value={companyInfo.website}
              onChange={handleCompanyInfoChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditCompanyInfoClose}>Cancel</Button>
            <Button onClick={handleEditCompanyInfoClose} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Tabs Section */}
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="about and jobs tabs">
          <Tab label="About" />
          <Tab label="Jobs" />
        </Tabs>

        {/* About Section */}
        {selectedTab === 0 && (
          <Box mt={3}>
            <Typography variant="h5" gutterBottom>About the Company</Typography>
            {isEditingAbout ? (
              <TextField
                label="About Description"
                fullWidth
                multiline
                rows={4}
                value={aboutDescription}
                onChange={handleAboutDescriptionChange}
                sx={{ mt: 2 }}
              />
            ) : (
              <Typography variant="body1" paragraph>{aboutDescription}</Typography>
            )}
            <Button variant="outlined" startIcon={<Edit />} onClick={toggleEditAbout} sx={{ mt: 2 }}>
              {isEditingAbout ? 'Save Description' : 'Edit Company Description'}
            </Button>
          </Box>
        )}

        {/* Jobs Section */}
        {selectedTab === 1 && (
          <Box mt={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5">Job Listings</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleNewJobOpen}
              >
                Create New Job Posting
              </Button>
            </Box>
            <Grid container spacing={3}>
              {jobs.map((job, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="subtitle1">{job.type}</Typography>
                    <Typography variant="subtitle2">{job.payRange}</Typography>
                    <Typography variant="subtitle2">Location: {job.location}</Typography>
                    <Typography variant="body2">Posted: {job.datePosted}</Typography>
                    {job.startDate && job.endDate && (
                      <Typography variant="body2">Start Date: {dayjs(job.startDate).format('MMMM D, YYYY')}, End Date: {dayjs(job.endDate).format('MMMM D, YYYY')}</Typography>
                    )}
                    <Button variant="outlined" fullWidth sx={{ mt: 1 }} onClick={() => handleEditJobOpen(index)}>View/Edit Job Posting</Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Edit Job Dialog */}
        {editJobOpen !== null && (
          <Dialog open={editJobOpen !== null} onClose={handleEditJobClose}>
            <DialogTitle>{newJobData ? 'Create New Job Posting' : 'Edit Job Posting'}</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Job Title"
                name="title"
                fullWidth
                value={newJobData ? newJobData.title : jobs[editJobOpen]?.title}
                onChange={(e) => {
                  if (newJobData) {
                    handleNewJobChange(e);
                  } else if (editJobOpen !== null) {
                    handleJobChange(e, editJobOpen);
                  }
                }}
              />
              <TextField
                margin="dense"
                label="Job Type"
                name="type"
                fullWidth
                value={newJobData ? newJobData.type : jobs[editJobOpen]?.type}
                onChange={(e) => {
                  if (newJobData) {
                    handleNewJobChange(e);
                  } else if (editJobOpen !== null) {
                    handleJobChange(e, editJobOpen);
                  }
                }}
              />
              <TextField
                margin="dense"
                label="Pay Range"
                name="payRange"
                fullWidth
                value={newJobData ? newJobData.payRange : jobs[editJobOpen]?.payRange}
                onChange={(e) => {
                  if (newJobData) {
                    handleNewJobChange(e);
                  } else if (editJobOpen !== null) {
                    handleJobChange(e, editJobOpen);
                  }
                }}
              />
              <TextField
                margin="dense"
                label="Location"
                name="location"
                fullWidth
                value={newJobData ? newJobData.location : jobs[editJobOpen]?.location}
                onChange={(e) => {
                  if (newJobData) {
                    handleNewJobChange(e);
                  } else if (editJobOpen !== null) {
                    handleJobChange(e, editJobOpen);
                  }
                }}
              />
              <DesktopDatePicker
                label="Start Date"
                value={newJobData ? (newJobData.startDate ? dayjs(newJobData.startDate) : null) : (jobs[editJobOpen]?.startDate ? dayjs(jobs[editJobOpen]?.startDate) : null)}
                onChange={(date) => {
                  if (newJobData) {
                    handleNewJobDateChange(date, 'startDate');
                  } else if (editJobOpen !== null) {
                    handleDateChange(date, 'startDate', editJobOpen);
                  }
                }}
                renderInput={(params) => <TextField {...params} margin="dense" fullWidth />}
              />
              <DesktopDatePicker
                label="End Date"
                value={newJobData ? (newJobData.endDate ? dayjs(newJobData.endDate) : null) : (jobs[editJobOpen]?.endDate ? dayjs(jobs[editJobOpen]?.endDate) : null)}
                onChange={(date) => {
                  if (newJobData) {
                    handleNewJobDateChange(date, 'endDate');
                  } else if (editJobOpen !== null) {
                    if (date && jobs[editJobOpen]?.startDate && dayjs(date).isBefore(dayjs(jobs[editJobOpen]?.startDate))) {
                      alert('End date cannot be before start date.');
                    } else {
                      handleDateChange(date, 'endDate', editJobOpen);
                    }
                  }
                }}
                renderInput={(params) => <TextField {...params} margin="dense" fullWidth />}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditJobClose}>Cancel</Button>
              {editJobOpen !== null && editJobOpen < jobs.length && (
                <Button color="error" onClick={() => handleDeleteJob(editJobOpen)} startIcon={<Delete />}>
                  Delete
                </Button>
              )}
              <Button
                onClick={() => {
                  if (newJobData) {
                    // Save new job to the jobs array
                    setJobs([...jobs, newJobData]);
                  }
                  handleEditJobClose();
                }}
                variant="contained"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </LocalizationProvider>
  );
};

export default EmployerProfilePage;