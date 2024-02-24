import { Outlet } from "react-router-dom";

import Navigation from "../navigation/Navigation.jsx";

function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default Layout;
