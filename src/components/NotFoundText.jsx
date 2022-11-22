import React from "react";

export default function NotFoundText({ text, visible }) {
  if (!visible) return null;
  return (
    <h1 className="font-semibold text-secondary dark:text-white text-center opacity-40 text-3xl py-5 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
      {text}
    </h1>
  );
}
