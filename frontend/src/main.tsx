import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
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
    ],
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
