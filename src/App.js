import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import EmailVerification from "./components/auth/EmailVerification";
import ForgotPassword from "./components/auth/ForgotPassword";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import MovieReviews from "./components/user/MovieReviews";
import Navbar from "./components/user/Navbar";
import SearchMovies from "./components/user/SearchMovies";
import SingleMovie from "./components/user/SingleMovie";
import { useAuth } from "./hooks";
import AdminNavigator from "./navigator/AdminNavigator";
function App() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  if (isAdmin) return <AdminNavigator />;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-email" element={<EmailVerification />} />
        <Route path="/auth/reset-password" element={<ConfirmPassword />} />
        <Route path="/movie/:movieId" element={<SingleMovie />} />
        <Route path="/movie/reviews/:movieId" element={<MovieReviews />} />
        <Route path="/movie/search" element={<SearchMovies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
