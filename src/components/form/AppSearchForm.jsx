import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const defaultInputStyle =
  "dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white text-lg";
export default function AppSearchForm({
  placeholder,
  onSubmit,
  inputClassName = defaultInputStyle,
  showResetIcon,
  onReset,
}) {
  const [value, setValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  const handleReset = (e) => {
    setValue("");
    onReset();
  };

  return (
    <form onSubmit={handleOnSubmit} className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className={
          "border-2 p-1 rounded bg-transparent outline-none " + inputClassName
        }
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      {showResetIcon ? (
        <button
          onClick={handleReset}
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-2 text-secondary dark:text-white"
        >
          <AiOutlineClose />
        </button>
      ) : null}
    </form>
  );
}
