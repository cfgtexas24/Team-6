import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import StudentProfile from "./routes/StudentProfile";
import JobBoard from "./routes/JobBoard.tsx";
import { StyledEngineProvider } from "@mui/material";
import Root from "./routes/Root";
// Setup Tailwind CSS:
import "./index.css";
// CSS for Roboto which is used by MUI:
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import EmployerProfilePage from "./routes/EmployerProfile";
import EmployerStudentSearchPage from "./routes/EmployerStudentSearch";


const router = createBrowserRouter([
  {
    // This is the root layout. All pages should be a child of this
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/employer-profile",
        element: <EmployerProfilePage />,
      },
      {
        path: "/employer-student-search",
        element: <EmployerStudentSearchPage />,
      },
    ],
  },
  {
    path: "/student-profile",
    element: <StudentProfile />,
  },
  {
    path: "/jobs",
    element: <JobBoard />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </StrictMode>,
);
