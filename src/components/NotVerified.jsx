import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

export default function NotVerified() {
  const { user, isLoggedIn } = useAuth();
  const isVerified = user?.isVerified;
  const navigate = useNavigate();
  const navigateToVerification = () => {
    navigate("/auth/verify-email", { state: { user: user.id } });
  };
  return (
    <div>
      {!isVerified && !isLoggedIn ? (
        <p className="text-lg text-center bg-blue-50 p-2">
          {" "}
          It Looks like you haven't verified,{" "}
          <button
            onClick={navigateToVerification}
            className="text-blue-500 font-semibold hover:underline"
          >
            click here to verify your account.
          </button>
        </p>
      ) : null}
    </div>
  );
}
