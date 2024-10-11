// src/components/Input.jsx
import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, name, className = '' }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${className}`}
    />
  );
};

export default Input;