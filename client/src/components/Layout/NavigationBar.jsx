import React from "react";
import { NavLink } from "react-router-dom";

const NavigationBar = ()=> {
  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Video Stream App</div>
        <nav className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline font-semibold" : "hover:underline"
            }
          >
            Upload
          </NavLink>
          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive ? "underline font-semibold" : "hover:underline"
            }
          >
            Library
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "underline font-semibold" : "hover:underline"
            }
          >
            Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
export default NavigationBar;