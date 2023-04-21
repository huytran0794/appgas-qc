import React from "react";
/* import react router dom packages */
import { Outlet, useLocation } from "react-router-dom";

const CustomLayout = () => {
  let location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/register") {
    return <Outlet />;
  }

  /* write more conditions here if you like */
  return (
    <>
      <main className="flex flex-col justify-center min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default CustomLayout;
