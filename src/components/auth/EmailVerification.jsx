import React, { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import Alert from "../Alert";
import Container from "../Container";
import FormContainer from "../form/FormContainer";

const isValidOTP = (otp) => {
  let valid;
  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }
  return valid;
};

const OTP_LENGTH = 6;
export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  const { user, handleEmailVerification, isLoggedIn, showAlert, resendOTP } =
    useAuth();
  const isVerified = user?.isVerified;
  const inputRef = useRef();
  const focusNextState = (index) => {
    setActiveOtpIndex(index + 1);
  };
  const focusPrevState = (index) => {
    let nextValue;
    const diff = index - 1;
    nextValue = diff < 0 ? 0 : diff;
    setActiveOtpIndex(nextValue);
  };
  const handleChange = ({ target }, index) => {
    const { value } = target;
    let newValue = [...otp];
    newValue[index] = value.substring(value.length - 1, value.length);
    if (!value) focusPrevState(index);
    else focusNextState(index);
    setOtp([...newValue]);
  };
  const onKeyChange = ({ key }, index) => {
    if (key === "Backspace") {
      focusPrevState(index);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidOTP(otp)) {
      return updateNotification("error", "Invalid OTP");
    }
    handleEmailVerification({
      OTP: otp.join(""),
      userId: user.id,
    });
  };

  const handleOTPResend = () => {
    resendOTP({ userId: user.id });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
  }, [user, isLoggedIn, isVerified]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses}>
          <div>
            {showAlert && <Alert />}
            <h5 className="dark:text-white text-xl font-semibold">
              Please enter the OTP to verify your account
            </h5>
            <p className="text-light-subtle text-center">
              OTP has been sent to your email
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  key={index}
                  ref={activeOtpIndex === index ? inputRef : null}
                  type="number"
                  onChange={(e) => handleChange(e, index)}
                  value={otp[index] || ""}
                  onKeyDown={(e) => onKeyChange(e, index)}
                  className="w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle bg-transparent dark:focus:border-white focus:border-primary outline-none text-center dark:text-white text-primary font-semibold text-xl"
                />
              );
            })}
          </div>
          <div>
            <button
              className="bg-secondary w-full p-2 rounded text-white font-semibold text-lg h-10 flex items-center justify-center"
              type="submit"
            >
              Verify account
            </button>
            <button
              className="mt-2 font-semibold text-blue-500"
              type="button"
              onClick={handleOTPResend}
            >
              I don't have OTP
            </button>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
