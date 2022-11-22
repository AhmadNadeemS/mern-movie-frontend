import React, { useEffect, useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import { Link, useNavigate } from "react-router-dom";
import isEmailValid from "../../utils/helper";
import { useAuth } from "../../hooks";
import Alert from "../Alert";
import Submit from "../Submit";
const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isEmailValid(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  //   if (password.length < 8)
  //     return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};
export default function SignIn() {
  const [userinfo, setUserinfo] = useState({
    email: "",
    password: "",
  });
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserinfo({ ...userinfo, [name]: value });
  };
  const { customAlert, showAlert, handleLogin, isLoading } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userinfo);
    if (!ok) {
      return customAlert("danger", error);
      //   return;
      //   return console.log(error)
      //   return updateNotification("error", error);
    }

    handleLogin(userinfo);
  };
  //   useEffect(() => {
  //     console.log("useEffect");
  //     if (isLoggedIn) navigate("/");
  //   }, [isLoggedIn]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          {showAlert && <Alert />}
          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            value={userinfo.email}
            onChange={handleChange}
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter Password"
            value={userinfo.password}
            onChange={handleChange}
          />
          <Submit value="Sign in" busy={isLoading} />
          <div className="flex justify-between items-center">
            <Link className="text-light-subtle" to="/auth/forgot-password">
              Forget password
            </Link>
            <Link className="text-light-subtle" to="/auth/sign-up">
              Sign up
            </Link>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
