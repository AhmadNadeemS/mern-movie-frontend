import React, { useEffect, useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import Alert from "../Alert";

const validateUserInfo = ({ passwordOne, passwordTwo }) => {
  if (!passwordOne.trim()) {
    return { ok: false, error: "Password is missing" };
  }
  if (passwordOne.trim().length < 8) {
    return {
      ok: false,
      error: "Password must be 8 characters long!",
    };
  }
  if (passwordOne !== passwordTwo) {
    return {
      ok: false,
      error: "Password do not match!",
    };
  }
  return { ok: true };
};

export default function ConfirmPassword() {
  const [password, setPassword] = useState({
    passwordOne: "",
    passwordTwo: "",
  });

  const {
    customAlert,
    displayAlert,
    verifyPasswordResetToken,
    showAlert,
    alertText,
    alertType,
    resetPassword,
    valid,
    error,
  } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(valid);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("userId");
  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };
  const getToken = async () => {
    const { valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);

    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", {
        replace: true,
      });
    }
    setIsValid(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error: newError } = validateUserInfo(password);
    if (!ok) {
      return customAlert("danger", newError);
    }
    await resetPassword({
      token,
      userId: id,
      newPassword: password.passwordOne,
    });
    if (error) return customAlert("danger", error);

    // updateNotification("success", message);
    // customAlert("success", message);
    navigate("/auth/sign-in", { replace: true });
  };
  useEffect(() => {
    getToken();
  }, []);

  if (isVerifying) {
    return (
      <FormContainer>
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">
            Please wait we are verifying your token!
          </h1>
        </Container>
      </FormContainer>
    );
  }
  if (!isValid) {
    return (
      <FormContainer>
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">
            Sorry the token is invalid!
          </h1>
        </Container>
      </FormContainer>
    );
  }
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          {showAlert && <Alert />}
          <FormInput
            value={password.passwordOne}
            onChange={handleChange}
            label="New Password"
            placeholder="********"
            name="passwordOne"
            type="password"
          />
          <FormInput
            value={password.passwordTwo}
            onChange={handleChange}
            label="Confirm Password"
            placeholder="********"
            name="passwordTwo"
            type="password"
          />
          <button
            className="bg-secondary w-full p-2 rounded text-white font-semibold text-lg h-10 flex items-center justify-center"
            type="submit"
          >
            Confirm Password
          </button>
        </form>
      </Container>
    </FormContainer>
  );
}
