import axios from "axios";
import React from "react";

import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  EMAIL_VERIFICATION_BEGIN,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_ERROR,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  CUSTOM_ALERT,
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  VERIFY_PASSWORD_SUCCESS,
  VERIFY_PASSWORD_BEGIN,
  VERIFY_PASSWORD_ERROR,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESEND_OTP_ERROR,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_BEGIN,
  LOGOUT_USER,
} from "./actions";

import { reducer } from "./reducer";

import { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
export const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  isLoggedIn: false,
  token: token,
  showAlert: false,
  alertText: "",
  alertType: "",
  valid: false,
  error: false,
};

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const authFetch = axios.create({
    baseURL: "http://localhost:3000/api",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      config.headers.put["Content-Type"] = "multipart/form-data";
      return config;
    },

    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        //   logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const displayAlert = (error) => {
    dispatch({ type: DISPLAY_ALERT, payload: { msg: error } });
    clearAlert();
  };

  const customAlert = (alertType, alertText) => {
    dispatch({ type: CUSTOM_ALERT, payload: { alertType, alertText } });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const handleLogin = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/sign-in",
        currentUser
      );
      navigate("/", { replace: true });
      const { user, token } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response?.data.msg },
      });
    }
  };

  const handleSignUp = async (currentUser) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/create",
        currentUser
      );
      const { user } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user },
      });
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response?.data.msg },
      });
    }
    clearAlert();
  };

  const handleEmailVerification = async (currentUser) => {
    dispatch({ type: EMAIL_VERIFICATION_BEGIN });
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/verify-user",
        currentUser
      );
      const { user, token, message } = data;
      dispatch({
        type: EMAIL_VERIFICATION_SUCCESS,
        payload: { user, token, message },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: EMAIL_VERIFICATION_ERROR,
        payload: { msg: error.response?.data.msg },
      });
    }
  };

  const handleForgotPassword = async (currentUser) => {
    dispatch({ type: FORGOT_PASSWORD_BEGIN });
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/forgot-password",
        currentUser
      );
      const { message } = data;
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: { message },
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: { msg: error.response?.data.msg },
      });
    }
  };

  const verifyPasswordResetToken = async (token, userId) => {
    dispatch({ type: VERIFY_PASSWORD_BEGIN });
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/verify-password-reset-token",
        { token, userId }
      );
      //   console.log(data);
      return data;
      //   const { valid } = data;
      //   dispatch({
      //     type: VERIFY_PASSWORD_SUCCESS,
      //     payload: { valid },
      //   });
    } catch (error) {
      console.log(error.response?.data);
      dispatch({
        type: VERIFY_PASSWORD_ERROR,
        payload: { msg: error.response?.data.msg },
      });
    }
  };

  const resetPassword = async (passwordInfo) => {
    dispatch({ type: RESET_PASSWORD_BEGIN });
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/reset-password",
        passwordInfo
      );
      //   return data;
      //   console.log(data);
      const { message } = data;
      // console.log();
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: { message },
      });
      clearAlert();
    } catch (error) {
      //   console.log(error.response?.data.msg);
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: { msg: error.response?.data.msg },
      });
      //   return { error: error.response?.data.msg };
    }
  };

  const resendOTP = async (userInfo) => {
    // dispatch({ type: RESEND_OTP_BEGIN });
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/resend-email-verification-token",
        userInfo
      );
      //   return data;
      //   console.log(data);
      const { user, message } = data;
      dispatch({
        type: RESEND_OTP_SUCCESS,
        payload: { user, message },
      });
      clearAlert();
    } catch (error) {
      dispatch({
        type: RESEND_OTP_ERROR,
        payload: { msg: error.response?.data.msg },
      });
      //   return { error: error.response?.data.msg };
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const uploadTrailer = async (formData, onUploadProgress) => {
    try {
      const { data } = await authFetch.post(
        "http://localhost:3000/api/movie/upload-trailer",
        formData,
        {
          onUploadProgress: ({ loaded, total }) => {
            if (onUploadProgress)
              onUploadProgress(Math.floor((loaded / total) * 100));
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error.response);
      const { response } = error;
      return response?.data.msg;
    }
  };

  const uploadMovie = async (formData) => {
    try {
      const { data } = await authFetch.post(
        "http://localhost:3000/api/movie/create",
        formData
      );
      return data;
    } catch (error) {
      console.log(error.response);
      const { response } = error;
      return response?.data.msg;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        handleLogin,
        handleSignUp,
        handleEmailVerification,
        displayAlert,
        customAlert,
        handleForgotPassword,
        verifyPasswordResetToken,
        resetPassword,
        resendOTP,
        logoutUser,
        uploadTrailer,
        uploadMovie,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
