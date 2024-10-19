import { FC } from "react";
import { Outlet } from "react-router-dom";
import LandingNavbar from "../components/LandingNavBar";

/**
 * This component is present on every route.
 * The page content is rendered where <Outlet/> is
 */

const Root: FC = () => {
  // TODO: Add entrypoint auth logic here
  // Fix: Might be easier to not use NavBar in root? Will need unique NavBars for each page i.e. LandingNavBar, UserNavBar, EmployerNavBar, etc.
  return (
    <>
      <LandingNavbar />
      <Outlet />
    </>
  );
};

export default Root;
