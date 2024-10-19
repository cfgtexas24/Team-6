import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Box,
  FormGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import REE from "../assets/REE.png";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [step, setStep] = useState(1); // Track the current step
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [appliesToYou, setAppliesToYou] = useState<string[]>([]);
  const [careerPath, setCareerPath] = useState<string[]>([]);
  const [areasToGrow, setAreasToGrow] = useState<string[]>([]);
  const navigate = useNavigate(); // Not using helper functions here to keep the code simple, learned this over time after doing LandingNavBar.tsx
  const hardcodedAccessCode = "12056";

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep(2); // Move to the next step after email is submitted
    }
  };

  const handleSubmitAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === hardcodedAccessCode) {
      setStep(3); // Move to the next step after access code is validated
    } else {
      alert("Invalid access code. Please try again.");
    }
  };

  // Handle checkboxes for areas of interest
  const handleCheckboxChange = (
    setState: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
  ) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
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

        {/* Step 1: Email Sign-Up */}
        {step === 1 && (
          <>
            <Typography variant="h5" className="text-center mb-4">
              Let's find your next opportunity
            </Typography>
            <Typography className="text-center text-gray-500 mb-4">
              ReBirth is a community-oriented education platform that connects
              job seekers with employers.
            </Typography>

            <form onSubmit={handleEmailSubmit} className="flex flex-col">
              <TextField
                type="email"
                label="Email address"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* Links */}
              <div className="text-center">
                <Typography variant="body2" className="mb-2">
                  Are you an employer?{" "}
                  <a
                    href="#"
                    onClick={() => navigate("/signup-employer")} // Navigate to /signup-employer
                    className="text-[#FEC10E]"
                  >
                    Register here
                  </a>
                </Typography>
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
              </div>
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
          </>
        )}

        {/* Step 2: Access Code Form */}
        {step === 2 && (
          <>
            <Typography
              variant="h5"
              component="h2"
              className="text-center mb-2"
            >
              Enter Access Code
            </Typography>
            <Typography className="text-center text-gray-500 mb-4">
              Please enter the access code sent to your email to continue.
            </Typography>

            <form onSubmit={handleSubmitAccessCode} className="flex flex-col">
              <TextField
                type="text"
                label="Access Code"
                variant="outlined"
                fullWidth
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
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

        {/* Step 3: Name Question */}
        {step === 3 && (
          <>
            <Typography variant="h5" className="mb-4">
              What is your name?
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleNext} variant="contained" sx={{ mt: 2 }}>
              Next
            </Button>
          </>
        )}

        {/* Step 4: Gender Question */}
        {step === 4 && (
          <>
            <Typography variant="h5" className="mb-4">
              What is your gender?
            </Typography>
            <RadioGroup
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="transgender"
                control={<Radio />}
                label="Transgender"
              />
              <FormControlLabel
                value="non-binary"
                control={<Radio />}
                label="Non-binary"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{ mt: 2, mr: 2 }}
            >
              Back
            </Button>
            <Button onClick={handleNext} variant="contained" sx={{ mt: 2 }}>
              Next
            </Button>
          </>
        )}

        {/* Step 5: Age Range Question */}
        {step === 5 && (
          <>
            <Typography variant="h5" className="mb-4">
              What is your age range?
            </Typography>
            <RadioGroup
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
            >
              <FormControlLabel
                value="under_16"
                control={<Radio />}
                label="16 and under"
              />
              <FormControlLabel
                value="over_16"
                control={<Radio />}
                label="Over 16"
              />
            </RadioGroup>
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{ mt: 2, mr: 2 }}
            >
              Back
            </Button>
            <Button onClick={handleNext} variant="contained" sx={{ mt: 2 }}>
              Next
            </Button>
          </>
        )}

        {/* Step 6: Does any of the following apply to you? */}
        {step === 6 && (
          <>
            <Typography variant="h5" className="mb-4">
              Does any of the following apply to you?
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={appliesToYou.includes("unemployed")}
                    onChange={() =>
                      handleCheckboxChange(setAppliesToYou, "unemployed")
                    }
                  />
                }
                label="Unemployed"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={appliesToYou.includes("LMI families")}
                    onChange={() =>
                      handleCheckboxChange(setAppliesToYou, "LMI families")
                    }
                  />
                }
                label="LMI families"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={appliesToYou.includes("foster care")}
                    onChange={() =>
                      handleCheckboxChange(setAppliesToYou, "foster care")
                    }
                  />
                }
                label="Foster care"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={appliesToYou.includes("criminal justice re-entry")}
                    onChange={() =>
                      handleCheckboxChange(
                        setAppliesToYou,
                        "criminal justice re-entry",
                      )
                    }
                  />
                }
                label="Criminal justice re-entry"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={appliesToYou.includes("veterans")}
                    onChange={() =>
                      handleCheckboxChange(setAppliesToYou, "veterans")
                    }
                  />
                }
                label="Veterans"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={appliesToYou.includes("homeless")}
                    onChange={() =>
                      handleCheckboxChange(setAppliesToYou, "homeless")
                    }
                  />
                }
                label="Homeless"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={appliesToYou.includes("domestic violence victims")}
                    onChange={() =>
                      handleCheckboxChange(
                        setAppliesToYou,
                        "domestic violence victims",
                      )
                    }
                  />
                }
                label="Domestic violence victims"
              />
            </FormGroup>
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{ mt: 2, mr: 2 }}
            >
              Back
            </Button>
            <Button onClick={handleNext} variant="contained" sx={{ mt: 2 }}>
              Next
            </Button>
          </>
        )}

        {/* Step 7: Career Path Question (based on age range) */}
        {step === 7 && (
          <>
            {ageRange === "under_16" ? (
              <>
                <Typography variant="h5" className="mb-4">
                  What career path intrigues you?
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={careerPath.includes("retail")}
                        onChange={() =>
                          handleCheckboxChange(setCareerPath, "retail")
                        }
                      />
                    }
                    label="Retail"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={careerPath.includes(
                          "customer service & sales",
                        )}
                        onChange={() =>
                          handleCheckboxChange(
                            setCareerPath,
                            "customer service & sales",
                          )
                        }
                      />
                    }
                    label="Customer service & sales"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={careerPath.includes("supply chain")}
                        onChange={() =>
                          handleCheckboxChange(setCareerPath, "supply chain")
                        }
                      />
                    }
                    label="Supply chain"
                  />
                </FormGroup>
              </>
            ) : (
              <>
                <Typography variant="h5" className="mb-4">
                  What career path intrigues you?
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={careerPath.includes("it support")}
                        onChange={() =>
                          handleCheckboxChange(setCareerPath, "it support")
                        }
                      />
                    }
                    label="IT Support"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={careerPath.includes("project management")}
                        onChange={() =>
                          handleCheckboxChange(
                            setCareerPath,
                            "project management",
                          )
                        }
                      />
                    }
                    label="Project Management"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={careerPath.includes("ux design")}
                        onChange={() =>
                          handleCheckboxChange(setCareerPath, "ux design")
                        }
                      />
                    }
                    label="UX Design"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={careerPath.includes("cybersecurity")}
                        onChange={() =>
                          handleCheckboxChange(setCareerPath, "cybersecurity")
                        }
                      />
                    }
                    label="Cybersecurity"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={careerPath.includes("data analytics")}
                        onChange={() =>
                          handleCheckboxChange(setCareerPath, "data analytics")
                        }
                      />
                    }
                    label="Data Analytics"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={careerPath.includes(
                          "digital marketing & e-commerce",
                        )}
                        onChange={() =>
                          handleCheckboxChange(
                            setCareerPath,
                            "digital marketing & e-commerce",
                          )
                        }
                      />
                    }
                    label="Digital Marketing & E-Commerce"
                  />
                </FormGroup>
              </>
            )}
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{ mt: 2, mr: 2 }}
            >
              Back
            </Button>
            <Button onClick={handleNext} variant="contained" sx={{ mt: 2 }}>
              Next
            </Button>
          </>
        )}

        {/* Step 8: Areas to Grow */}
        {step === 8 && (
          <>
            <Typography variant="h5" className="mb-4">
              What areas would you like to grow in?
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={areasToGrow.includes(
                      "resume and cover letter writing",
                    )}
                    onChange={() =>
                      handleCheckboxChange(
                        setAreasToGrow,
                        "resume and cover letter writing",
                      )
                    }
                  />
                }
                label="Resume and cover letter writing"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={areasToGrow.includes("interview preparation")}
                    onChange={() =>
                      handleCheckboxChange(
                        setAreasToGrow,
                        "interview preparation",
                      )
                    }
                  />
                }
                label="Interview preparation"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={areasToGrow.includes("financial literacy")}
                    onChange={() =>
                      handleCheckboxChange(setAreasToGrow, "financial literacy")
                    }
                  />
                }
                label="Financial literacy"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={areasToGrow.includes("digital proficiency")}
                    onChange={() =>
                      handleCheckboxChange(
                        setAreasToGrow,
                        "digital proficiency",
                      )
                    }
                  />
                }
                label="Digital proficiency"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={areasToGrow.includes("communication skills")}
                    onChange={() =>
                      handleCheckboxChange(
                        setAreasToGrow,
                        "communication skills",
                      )
                    }
                  />
                }
                label="Communication skills"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={areasToGrow.includes("online presence")}
                    onChange={() =>
                      handleCheckboxChange(setAreasToGrow, "online presence")
                    }
                  />
                }
                label="Online presence"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={areasToGrow.includes("job placement")}
                    onChange={() =>
                      handleCheckboxChange(setAreasToGrow, "job placement")
                    }
                  />
                }
                label="Job placement"
              />
            </FormGroup>
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{ mt: 2, mr: 2 }}
            >
              Back
            </Button>
            {/* Navigate to /home after completing the form */}
            <Button
              onClick={() => navigate("/home")}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Finish
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default SignupPage;
