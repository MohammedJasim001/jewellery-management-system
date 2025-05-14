import React from "react";



const Button = ({
  children,
  onClick,
  className,
  disabled,
  type = "button",
  form,
  name,
  value,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 bg-neutral-700  rounded-md hover:bg-neutral-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${className} text-white`}
      type={type}
      form={form}
      name={name}
      value={value}
    >
      {children}
    </button>
  );
};

export default Button;