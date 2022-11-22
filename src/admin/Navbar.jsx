import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { FaUserNinja } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../hooks";

export default function Navbar() {
  const { logoutUser } = useAuth();
  return (
    <nav className="w-48 min-h-screen bg-primary dark:bg-secondary border-r border-gray-300 ">
      <div className="flex flex-col justify-between pl-5 sticky top-0 h-screen">
        <ul>
          <li className="mb-8">
            <Link to="/">
              <img src="./logo.png" alt="" className="h-14 p-2" />
            </Link>
          </li>
          <li>
            <NavItem to="/">
              <AiOutlineHome />
              <span>Home</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/movies">
              <BiMoviePlay />
              <span>Movies</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/actors">
              <FaUserNinja />
              <span>Actors</span>
            </NavItem>
          </li>
        </ul>
        <div className="flex flex-col items-start pb-5">
          <span className="text-white text-xl font-semibold">Admin</span>
          <button
            className="flex items-center text-sm text-dark-subtle space-x-1"
            onClick={logoutUser}
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

const NavItem = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        (isActive ? "text-white" : "text-gray-400") +
        " flex items-center p-2 space-x-2 text-lg hover:opacity-80"
      }
    >
      {children}
    </NavLink>
  );
};
