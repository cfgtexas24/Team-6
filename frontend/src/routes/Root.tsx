import { FC } from "react";
import { Outlet } from "react-router-dom";

/**
 * This component is present on every route.
 * The page content is rendered where <Outlet/> is
 */
const Root: FC = () => {
  // TODO: Add entrypoint auth logic here
  // TODO: Add navbar here
  return <Outlet />;
};

export default Root;
