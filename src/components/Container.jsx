import React from "react";

export default function Container({ className, children }) {
  return (
    <div className={"max-w-screen-xl mx-auto " + className}>{children}</div>
  );
}
