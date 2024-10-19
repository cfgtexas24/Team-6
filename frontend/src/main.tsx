import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./routes/Landing";
import SignUp from "./routes/SignUp";
import EmployerSignUp from "./routes/EmployerSignUp";
import StudentProfile from "./routes/StudentProfile";
import Home from "./routes/Home";
import TrackApplications from "./routes/TrackApplications.tsx";
import JobBoard from "./routes/JobBoard.tsx";
import CreateJobs from "./routes/CreateJobs.tsx";
import LearningLibrary from "./routes/LearningLibrary.tsx";
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
import EmployerProfilePage from "./routes/EmployerProfile";
import EmployerStudentSearchPage from "./routes/EmployerStudentSearch";
import Forum from "./routes/Forum";
import DirectMessage from "./routes/DirectMessage";
import Alumni from "./routes/Alumni.tsx";
import ResumeReview from "./routes/ResumeReview.tsx";
import EmployerHome from "./routes/EmployerHome.tsx";

const router = createBrowserRouter([
  {
    // This is the root layout. All pages should be a child of this
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Landing />,
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
        element: <JobBoard />,
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
      {
        path: "/employer-profile",
        element: <EmployerProfilePage />,
      },
      {
        path: "/employer-student-search",
        element: <EmployerStudentSearchPage />,
      },
      {
        path: "/track-applications",
        element: <TrackApplications />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signup-employer",
    element: <EmployerSignUp />,
  },
  {
    path: "/home-employer",
    element: <EmployerHome />,
  },
  {
    path: "/create-a-job",
    element: <CreateJobs />,
  },
  {
    path: "/learning-library",
    element: <LearningLibrary />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </QueryClientProvider>
  </StrictMode>
);
