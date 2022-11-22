import React from "react";

export default function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-light-subtle  dark:text-dark-subtle font-semibold "
    >
      {children}
    </label>
  );
}
