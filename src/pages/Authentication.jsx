// src/pages/Authentication.jsx
import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

const Authentication = () => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Authentication</h2>
        <p className="text-center text-gray-600">
          Once your authentication is clear you can click Continue to get to the last step of account recovery
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                maxLength="1"
                className="w-14 text-center"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>
          <Button type="submit" className="w-full">Continue</Button>
        </form>
        <div className="text-center">
          <button className="text-sm text-primary hover:underline">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;