import React from "react";

export default function Selector({ name, value, onChange, label, options }) {
  return (
    <select
      className="border-2 border-light-subtle dark:bg-primary dark:border-dark-subtle rounded p-1 pr-10 transition bg-transparent outline-none text-light-subtle dark:text-dark-subtle focus:border-primary focus:text-primary dark:focus:text-white dark:focus:border-white"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
    >
      <option value="" hidden="hidden">
        {/* <option value="" disabled> */}
        {value ? value : label}
      </option>
      {options.map(({ title, value }) => {
        return (
          <option key={title} value={value} defaultValue={value}>
            {title}
          </option>
        );
      })}
    </select>
  );
}
