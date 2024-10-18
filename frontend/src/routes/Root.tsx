import { Alert, LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { checkUserAuth } from "../util/authentication";

// These pathnames will not check authentication. They must be an exact match with the current path
const unauthenticatedPaths = ["/", "/login"];

/**
 * This component is present on every route.
 * The page content is rendered where <Outlet/> is
 */
const Root: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ["checkUserAuth"],
    staleTime: 60 * 1000 * 60, // Only check auth every hour (unless invalidated by login/logout)
    queryFn: checkUserAuth,
  });

  const isAuthenticatedRoute = unauthenticatedPaths.every(
    (path) => path !== location.pathname,
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated && isAuthenticatedRoute) {
      // Go to login page if trying to access authenticated route while unauthenticated
      navigate("/login", { replace: true });
    }
  }, [isLoading, isAuthenticated, isAuthenticatedRoute, navigate]);

  if (isAuthenticatedRoute) {
    if (isLoading) {
      return <LinearProgress />;
    }

    if (!isAuthenticated) {
      // This component should not be displayed since the redirect should be automatic.
      // However, just in case, this gives the login link too
      return (
        <Alert severity="error">
          You are not logged in. Please login <Link to="/login">here</Link>
        </Alert>
      );
    }
  }

  // TODO: Add navbar here
  return <Outlet />;
};

export default Root;
