// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const ButtonGroup = ({ children }) => (
  <div className="flex flex-col space-y-4">
    {children}
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center">Welcome to Timely</h1>
        <p className="text-center text-gray-600">
          Effortlessly schedule Zoom meetings for groups with our user-friendly app. Secure login, streamlined availability make organizing meetings a breeze.
        </p>
        <ButtonGroup>
          <Link to="/login">
            <Button className="w-full">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300">Sign Up</Button>
          </Link>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Home;