import React from "react";
import { useAuth } from "../hooks";

export default function Alert() {
  const { alertText, alertType } = useAuth();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
}
