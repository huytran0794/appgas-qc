import React from "react";
/* import react router dom packages */
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";

const CustomLayout = () => {
  let location = useLocation();
  let navigation = useNavigate();
  if (location.pathname === "/login" || location.pathname === "/register") {
    return <Outlet />;
  }

  /* write more conditions here if you like */
  return (
    <>
      <main className="flex flex-col justify-center min-h-screen">
        <Outlet />
        {console.log("location")}
        {console.log(location.pathname)}
      </main>
    </>
  );
};

export default CustomLayout;
