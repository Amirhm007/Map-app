import React from "react";
import { Link } from "react-router-dom";
function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className="h-[4.2rem]" />
    </Link>
  );
}
export default Logo;
