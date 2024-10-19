import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import REE from "../assets/REE.png";

const EmployerSignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [employeeBenefits, setEmployeeBenefits] = useState<string[]>([]);
  const [step, setStep] = useState(1); // Track current step
  const navigate = useNavigate();
  const hardcodedConfirmationCode = "12056";

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep(2); // Move to the next step after email is submitted
    }
  };

  const handleConfirmationCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmationCode === hardcodedConfirmationCode) {
      setStep(3); // Move to the next step after access code is validated
    } else {
      alert("Invalid confirmation code. Please try again.");
    }
  };

  // Handle adding/removing locations dynamically
  const addLocation = () => {
    if (currentLocation) {
      setLocations([...locations, currentLocation]);
      setCurrentLocation(""); // Clear input field after adding location
    }
  };

  const removeLocation = (location: string) => {
    setLocations(locations.filter((loc) => loc !== location));
  };

  // Handle checkbox selection for employee benefits
  const handleCheckboxChange = (value: string) => {
    setEmployeeBenefits((prev) =>
      prev.includes(value)
        ? prev.filter((benefit) => benefit !== value)
        : [...prev, value],
    );
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Box
        className="bg-white p-8 shadow-md rounded-lg w-full max-w-md"
        sx={{
          "& .MuiTextField-root": { marginBottom: 2 },
        }}
      >
        {/* Logo */}
        <Typography variant="h3" component="h1" className="mb-4 text-center">
          <img src={REE} alt="Logo" style={{ height: "50px" }} />
        </Typography>

        {/* Step 1: Company Email */}
        {step === 1 && (
          <div className="text-center">
            <Typography variant="h5" className="text-center mb-4">
              Sign Up for ReBirth as an Employer
            </Typography>
            <form onSubmit={handleEmailSubmit} className="flex flex-col">
              <TextField
                type="email"
                label="Company Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Typography variant="body2">
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={() => navigate("/login")} // Navigate to /login
                  className="text-[#FEC10E]"
                >
                  Sign in here
                </a>
              </Typography>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#FEC10E",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#E0A90C",
                  },
                  mt: 2,
                  mb: 2,
                }}
              >
                Continue
              </Button>
            </form>
          </div>
        )}

        {/* Step 2: Confirmation Code */}
        {step === 2 && (
          <>
            <Typography
              variant="h5"
              component="h2"
              className="text-center mb-2"
            >
              Enter Confirmation Code
            </Typography>
            <Typography className="text-center text-gray-500 mb-4">
              Please enter the confirmation code sent to your email to continue.
            </Typography>

            <form
              onSubmit={handleConfirmationCodeSubmit}
              className="flex flex-col"
            >
              <TextField
                type="text"
                label="Confirmation Code"
                variant="outlined"
                fullWidth
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#FEC10E",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#E0A90C",
                  },
                  mb: 2,
                }}
              >
                Submit
              </Button>
            </form>
          </>
        )}

        {/* Step 3: Company Name */}
        {step === 3 && (
          <>
            <Typography variant="h5" className="mb-4">
              What is your company name?
            </Typography>
            <TextField
              label="Company Name"
              variant="outlined"
              fullWidth
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#FEC10E",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#E0A90C",
                },
              }}
            >
              Next
            </Button>
          </>
        )}

        {/* Step 4: Industry Dropdown */}
        {step === 4 && (
          <>
            <Typography variant="h5" className="mb-4">
              What industry is your company in?
            </Typography>
            <TextField
              select
              label="Industry"
              variant="outlined"
              fullWidth
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
              <MenuItem value="healthcare">Healthcare</MenuItem>
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="manufacturing">Manufacturing</MenuItem>
            </TextField>
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{
                mt: 2,
                mr: 2,
                borderColor: "#FEC10E",
                color: "#FEC10E",
                "&:hover": {
                  borderColor: "#E0A90C",
                  color: "#E0A90C",
                },
              }}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#FEC10E",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#E0A90C",
                },
              }}
            >
              Next
            </Button>
          </>
        )}

        {/* Step 5: Company Website */}
        {step === 5 && (
          <>
            <Typography variant="h5" className="mb-4">
              What is your company's website?
            </Typography>
            <TextField
              label="Company Website"
              variant="outlined"
              fullWidth
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{
                mt: 2,
                mr: 2,
                borderColor: "#FEC10E",
                color: "#FEC10E",
                "&:hover": {
                  borderColor: "#E0A90C",
                  color: "#E0A90C",
                },
              }}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#FEC10E",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#E0A90C",
                },
              }}
            >
              Next
            </Button>
          </>
        )}

        {/* Step 6: Company Locations (Dynamic Inputs) */}
        {step === 6 && (
          <>
            <Typography variant="h5" className="mb-4">
              Where is your company located?
            </Typography>
            <TextField
              label="Add a location"
              variant="outlined"
              fullWidth
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
            />
            <Button
              onClick={addLocation}
              variant="outlined"
              sx={{
                mt: 2,
                mr: 2,
                borderColor: "#FEC10E",
                color: "#FEC10E",
                "&:hover": {
                  borderColor: "#E0A90C",
                  color: "#E0A90C",
                },
              }}
            >
              Add Location
            </Button>

            {/* Display added locations */}
            {locations.map((location, index) => (
              <Box key={index} className="mt-2 flex items-center">
                <Typography>{location}</Typography>
                <Button
                  onClick={() => removeLocation(location)}
                  variant="text"
                  color="error"
                  sx={{ ml: 2 }}
                >
                  Remove
                </Button>
              </Box>
            ))}

            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{
                mt: 2,
                mr: 2,
                borderColor: "#FEC10E",
                color: "#FEC10E",
                "&:hover": {
                  borderColor: "#E0A90C",
                  color: "#E0A90C",
                },
              }}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#FEC10E",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#E0A90C",
                },
              }}
            >
              Next
            </Button>
          </>
        )}

        {/* Step 7: Employee Benefits */}
        {step === 7 && (
          <>
            <Typography variant="h5" className="mb-4">
              What employee benefits does your company offer?
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={employeeBenefits.includes("Health Insurance")}
                    onChange={() => handleCheckboxChange("Health Insurance")}
                  />
                }
                label="Health Insurance"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={employeeBenefits.includes("Retirement Plans")}
                    onChange={() => handleCheckboxChange("Retirement Plans")}
                  />
                }
                label="Retirement Plans"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={employeeBenefits.includes("Paid Time Off")}
                    onChange={() => handleCheckboxChange("Paid Time Off")}
                  />
                }
                label="Paid Time Off"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={employeeBenefits.includes("Remote Work")}
                    onChange={() => handleCheckboxChange("Remote Work")}
                  />
                }
                label="Remote Work"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={employeeBenefits.includes("Parental Leave")}
                    onChange={() => handleCheckboxChange("Parental Leave")}
                  />
                }
                label="Parental Leave"
              />
            </FormGroup>
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{
                mt: 2,
                mr: 2,
                borderColor: "#FEC10E",
                color: "#FEC10E",
                "&:hover": {
                  borderColor: "#E0A90C",
                  color: "#E0A90C",
                },
              }}
            >
              Back
            </Button>
            <Button
              onClick={() => navigate("/home-employer")}
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#FEC10E",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#E0A90C",
                },
              }}
            >
              Finish
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default EmployerSignupPage;
