import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./routes/Landing";
import SignUp from "./routes/SignUp";
import EmployerSignUp from "./routes/EmployerSignUp";
import StudentProfile from "./routes/StudentProfile";
import JobBoard from "./routes/JobBoard.tsx";
import { StyledEngineProvider } from "@mui/material";
import Root from "./routes/Root";
import Login from "./routes/Login";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/queryclient";
// Setup Tailwind CSS:
import "./index.css";
// CSS for Roboto which is used by MUI:
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Forum from "./routes/Forum";
import DirectMessage from "./routes/DirectMessage";
import Alumni from "./routes/Alumni.tsx";
import ResumeReview from "./routes/ResumeReview.tsx";

const router = createBrowserRouter([
  {
    // This is the root layout. All pages should be a child of this
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Landing />, // Use Landing from fe-sign-up-screens
      },
      {
        path: "/community-forums",
        element: <Forum />,
      },
      {
        path: "/community-forums/:category",
        element: <Forum />,
      },
      {
        path: "/community-forums/:category/:post",
        element: <Forum />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/student-profile",
        element: <StudentProfile />,
      },
      {
        path: "/jobs",
        element: <JobBoard />, // Use JobBoard from main
      },
      {
        path: "/direct-message/:otherUser",
        element: <DirectMessage />,
      },
      {
        path: "/talk-to-alumni",
        element: <Alumni />,
      },
      {
        path: "/resume-review",
        element: <ResumeReview />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />, // Use SignUp from fe-sign-up-screens
  },
  {
    path: "/signup-employer",
    element: <EmployerSignUp />, // Use EmployerSignUp from fe-sign-up-screens
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </QueryClientProvider>
  </StrictMode>,
);
