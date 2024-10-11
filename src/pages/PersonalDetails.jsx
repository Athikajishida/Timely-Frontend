// src/pages/PersonalDetails.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Personal Details</h2>
        <p className="text-center text-gray-600">
          Once your have created your account, you will be redirected to the Log in page where you can log in and interact with our Meeting Scheduler App.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <Button type="submit" className="w-full">Finish</Button>
        </form>
        <div className="mt-6 space-y-2">
          <p className="text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
          </p>
          <p className="text-center text-sm text-gray-600">
            Need to sign up? <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
          </p>
          <p className="text-center text-sm text-gray-600">
            Forgot your password? <Link to="/forgot-password" className="text-primary hover:underline">Reset it here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;