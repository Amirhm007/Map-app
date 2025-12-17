import React from "react";
import { NavLink } from "react-router-dom";

function AppNav() {
  const linkStyles = ({ isActive }) =>
    `block text-inherit no-underline uppercase text-sm font-bold py-2 px-8 rounded-md transition-all 
     ${isActive ? "bg-stone-500" : "hover:bg-stone-700/50"}`;

  return (
    <div className="mt-6 mb-8">
      <ul className="list-none flex bg-stone-700 rounded-lg">
        <li>
          <NavLink to="cities" className={linkStyles}>
            cities
          </NavLink>
        </li>
        <li>
          <NavLink to="countries" className={linkStyles}>
            countries
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AppNav;
