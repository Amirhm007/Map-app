import React from "react";
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-stone-900 p-10 rounded-md pt-6 pb-6 flex flex-col items-center h-[calc(100vh)]">
      <Logo />
      <AppNav />
      <Outlet />
      <footer className="mt-2">
        <p className="text-sm text-stone-300">
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc{" "}
        </p>
       
      </footer>
    </div>
  );
}

export default Sidebar;
