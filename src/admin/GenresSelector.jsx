import React from "react";
import { ImTree } from "react-icons/im";

export default function GenresSelector({ onClick, badge }) {
  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span
        className="absolute text-white bg-light-subtle rounded-full w-5 h-5 top-0 right-0 flex justify-center text-xs items-center translate-x-3
        -translate-y-1"
      >
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className="dark:border-dark-subtle bg-transparent relative text-light-subtle border-2 dark:text-dark-subtle border-light-subtle flex justify-center items-center rounded hover:text-primary hover:border-primary transition space-x-2 py-1 px-3 whitespace-nowrap"
    >
      <ImTree />
      <span>Select Genres</span>
      {renderBadge()}
    </button>
  );
}
