import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  className = '',
  error,
  name,
  value,
  onChange,
  onBlur,
  ...rest
}) => {
  return (
    <div className="mb-4">
      <label className="block text-neutral-700 mb-1 font-bold">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-2 border border-gray-300 rounded-md ${error ? 'border-red-500' : ''} ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
