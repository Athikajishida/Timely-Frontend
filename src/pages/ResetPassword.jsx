// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">New Password</h2>
        <ul className="text-sm text-gray-600 list-disc pl-5">
          <li>Your password can't be too similar to your other personal information.</li>
          <li>Your password must contain at least 8 characters.</li>
          <li>Your password can't be a commonly used password.</li>
          <li>Your password can't be entirely numeric.</li>
        </ul>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="password"
            name="newPassword"
            placeholder="New password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button type="submit" className="w-full">Finish</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;