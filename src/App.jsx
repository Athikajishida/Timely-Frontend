// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersonalDetails from './pages/PersonalDetails';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Authentication from './pages/Authentication';
import ResetPassword from './pages/ResetPassword';
import OTPConfirmation from './pages/OTPConfirmation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonalDetails />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm-otp" element={<OTPConfirmation />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;