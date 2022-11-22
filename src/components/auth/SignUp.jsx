import React, { useEffect, useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import Alert from "../Alert";
import isEmailValid from "../../utils/helper";

const validateUserInfo = ({ name, email, password }) => {
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isEmailValid(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };
  return { ok: true };
};

export default function SignUp() {
  const { handleSignUp } = useAuth();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { updateNotification } = useNotification();
  const { displayAlert, clearAlert, showAlert } = useAuth();
  const navigate = useNavigate();
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) {
      //   displayAlert();
      //   return;
      //   return console.log(error)
      return updateNotification("error", error);
    }
    await handleSignUp(userInfo);
    navigate("/auth/verify-email", {
      //   state: { user: response.user },
      replace: true,
    });
  };

  const { name, email, password } = userInfo;
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          {showAlert && <Alert />}
          <FormInput
            name="name"
            label="Name"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={handleChange}
          />
          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleChange}
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handleChange}
          />
          <button
            className="bg-secondary w-full p-2 rounded text-white font-semibold text-lg h-10 flex items-center justify-center"
            type="submit"
          >
            Sign up
          </button>
          <div className="flex justify-between items-center">
            <Link className="text-light-subtle" to="/auth/forgot-password">
              Forget password
            </Link>
            <Link className="text-light-subtle" to="/">
              Sign in
            </Link>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
