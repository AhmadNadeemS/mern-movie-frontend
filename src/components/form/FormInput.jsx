import React from "react";

export default function FormInput({
  name,
  label,
  placeholder,
  value,
  onChange,
  ...rest
}) {
  return (
    <div className="flex flex-col-reverse">
      <input
        {...rest}
        className="bg-transparent text-secondary dark:border-dark-subtle  border-light-subtle border-2 rounded p-1 text-lg"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <label htmlFor={name} className="text-light-subtle font-semibold">
        {label}
      </label>
    </div>
  );
}
