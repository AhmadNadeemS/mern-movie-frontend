import React from "react";

export default function FormContainer({ children }) {
  return (
    <div className="fixed inset-0 -z-10 flex justify-center items-center dark:bg-primary bg-white ">
      {children}
    </div>
  );
}
