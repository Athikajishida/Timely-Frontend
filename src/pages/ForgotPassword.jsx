// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password recovery logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Recover Account</h2>
        <p className="text-center text-gray-600">
          Kindly input your Email address and your phone number to recover your account on Meeting Scheduler
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" className="w-full">Find my account</Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;