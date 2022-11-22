import React, { useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import { Link } from "react-router-dom";
import isEmailValid from "../../utils/helper";
import { useAuth } from "../../hooks";
import Alert from "../Alert";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { customAlert, showAlert, handleForgotPassword } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) return customAlert("danger", "Invalid email!");
    handleForgotPassword({ email });
  };

  return (
    <FormContainer>
      <Container>
        <form
          onSubmit={handleSubmit}
          className={commonModalClasses + " w-[30.125rem]"}
        >
          {showAlert && <Alert />}
          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button
            className="bg-secondary w-full p-2 rounded text-white font-semibold text-lg h-10 flex items-center justify-center"
            type="submit"
          >
            Send Link
          </button>
          <div className="flex justify-between items-center">
            <Link className="text-light-subtle" to="/">
              Sign in
            </Link>
            <Link className="text-light-subtle" to="/">
              Sign up
            </Link>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
