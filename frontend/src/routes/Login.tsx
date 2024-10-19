import React, { useState } from "react";
import { Button, TextField, Typography, Box, Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { login } from "../util/authentication";
import { useNavigate } from "react-router-dom";
import REE from "../assets/REE.png";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { refetch: loginFetch, error } = useQuery({
    queryKey: ["login", { username, password }] as const,
    queryFn: ({ queryKey }) =>
      login(queryKey[1].username!, queryKey[1].password!),
    enabled: false,
    retry: false,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginFetch().then((res) => {
      if (res.isError) return;
      const url = new URL(window.location.href);
      const redirectParam = url.searchParams.get("redirect");
      if (redirectParam) {
        navigate(redirectParam);
      } else {
        navigate("/home");
      }
    });
  };

  const handleForgot = (type: string) => {
    alert(`An email has been sent to recover your ${type}.`);
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

        {/* Login Form */}
        <Typography variant="h5" className="text-center mb-4">
          Welcome Back
        </Typography>
        <Typography className="text-center text-gray-500 mb-4">
          Log in to your account and continue your journey with ReBirth.
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <TextField
            type="text"
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.message}
            </Alert>
          )}

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
            Log In
          </Button>
        </form>

        {/* Forgot Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            mb: 2,
          }}
        >
          <Button
            color="primary"
            sx={{ textTransform: "none" }}
            onClick={() => handleForgot("username")}
          >
            Forgot my username
          </Button>
          <Button
            color="primary"
            sx={{ textTransform: "none" }}
            onClick={() => handleForgot("password")}
          >
            Forgot my password
          </Button>
        </Box>

        {/* Links */}
        <div className="text-center">
          <Typography variant="body2" className="mb-2">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={() => navigate("/signup")}
              className="text-[#FEC10E]"
            >
              Sign up here
            </a>
          </Typography>
          <Typography variant="body2">
            Are you an employer?{" "}
            <a
              href="#"
              onClick={() => navigate("/signup-employer")}
              className="text-[#FEC10E]"
            >
              Register here
            </a>
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default Login;
