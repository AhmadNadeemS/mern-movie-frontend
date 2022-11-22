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
  CUSTOM_ALERT,
  CLEAR_ALERT,
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  VERIFY_PASSWORD_SUCCESS,
  VERIFY_PASSWORD_BEGIN,
  VERIFY_PASSWORD_ERROR,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_ERROR,
  LOGOUT_USER,
} from "./actions";
import { initialState } from "./AuthProvider";

export const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === CUSTOM_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: action.payload.alertType,
      alertText: action.payload.alertText,
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: false };
  }
  if (action.type === EMAIL_VERIFICATION_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === FORGOT_PASSWORD_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === VERIFY_PASSWORD_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === RESET_PASSWORD_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      //   showAlert: true,
      isLoggedIn: true,
      //   alertType: "success",
      //   alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      isLoggedIn: true,
      alertType: "success",
      alertText: action.payload.msg,
    };
  }
  if (action.type === EMAIL_VERIFICATION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      isLoggedIn: true,
      alertType: "success",
      alertText: action.payload.msg,
    };
  }
  if (action.type === FORGOT_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.message,
    };
  }
  if (action.type === VERIFY_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      valid: action.payload.valid,
    };
  }
  if (action.type === RESET_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      isLoggedIn: true,
      error: false,
      alertType: "success",
      alertText: action.payload.message,
    };
  }
  if (action.type === RESEND_OTP_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      isLoggedIn: true,
      error: false,
      alertType: "success",
      alertText: action.payload.message,
      user: action.payload.user,
    };
  }
  //   if (action.type === RESET_PASSWORD_SUCCESS) {
  //     return {
  //       ...state,
  //       isLoading: false,
  //       valid: action.payload.valid,
  //     };
  //   }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      isLoggedIn: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === EMAIL_VERIFICATION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === FORGOT_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === VERIFY_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === RESET_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      error: true,
      alertText: action.payload.msg,
    };
  }
  if (action.type === RESEND_OTP_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      error: true,
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: "",
      token: "",
    };
  }
};
