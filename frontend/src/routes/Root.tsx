import { Alert } from "@mui/material";
import { FC, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { checkUserAuth } from "../util/authentication";
import LandingNavbar from "../components/LandingNavBar";

// These pathnames will not check authentication. They must be an exact match with the current path
const unauthenticatedPaths = ["/", "/login"];

/**
 * This component is present on every route.
 * The page content is rendered where <Outlet/> is
 */

const Root: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = checkUserAuth();

  const isAuthenticatedRoute = unauthenticatedPaths.every(
    (path) => path !== location.pathname,
  );

  useEffect(() => {
    // Go to login page if trying to access authenticated route while unauthenticated
    if (!isAuthenticated && isAuthenticatedRoute) {
      // Add redirect path for after login
      const redirectUrl = encodeURIComponent(
        window.location.pathname + window.location.search,
      );
      navigate(`/login?redirect=${redirectUrl}`, { replace: true });
    }
  }, [isAuthenticated, isAuthenticatedRoute, navigate]);

  if (isAuthenticatedRoute && !isAuthenticated) {
    // This component should not be displayed since the redirect should be automatic.
    // However, just in case, this gives the login link too
    return (
      <Alert severity="error">
        You are not logged in. Please login <Link to="/login">here</Link>
      </Alert>
    );
  }

  // Fix: Might be easier to not use NavBar in root? Will need unique NavBars for each page i.e. LandingNavBar, UserNavBar, EmployerNavBar, etc.
  return (
    <>
      <LandingNavbar />
      <Outlet />
    </>
  );
};

export default Root;
