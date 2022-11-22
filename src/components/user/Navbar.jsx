import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import Container from "../Container";
import AppSearchForm from "../form/AppSearchForm";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  //   const { isLoggedIn, logoutUser } = useAuth();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearchSubmit = (query) => {
    navigate("/movie/search?title=" + query);
  };
  return (
    <nav className="bg-secondary shadow-sm">
      <Container className="p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img className="sm:h-10 h-8" src="/logo.png" alt="logo" />
          </Link>
          <ul className="flex justify-between items-center sm:space-x-4 space-x-2">
            <li>
              <button
                onClick={toggleTheme}
                className="dark:bg-white bg-dark-subtle p-1 rounded sm:text-2xl text-lg"
              >
                <BsFillSunFill className="text-secondary" />
              </button>
            </li>
            <li>
              <AppSearchForm
                placeholder="Search"
                inputClassName="text-white border-dark-subtle focus:border-white sm:w-auto w-40 sm:text-lg"
                onSubmit={handleSearchSubmit}
              />
              {/* <input
                type="text"
                className="bg-transparent text-white border-dark-subtle border-2 rounded p-1 text-lg
                "
                placeholder="Search"
              /> */}
            </li>
            {user ? (
              <button
                onClick={logoutUser}
                className="text-white font-semibold text-lg"
              >
                Logout
              </button>
            ) : (
              <Link to="/auth/sign-in">
                <li className="text-white font-semibold text-lg">Login</li>
              </Link>
            )}
          </ul>
        </div>
      </Container>
    </nav>
  );
}
