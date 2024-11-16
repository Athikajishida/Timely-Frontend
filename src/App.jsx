// src/App.jsx
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useEffect } from 'react'; // Import useEffect
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { setUser } from './store/authSlice'; // Import setUser action from authSlice
import { addEvent } from './store/eventsSlice';
import { fetchUserBookings } from './store/bookingsSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Authentication from './pages/Authentication';
import ResetPassword from './pages/ResetPassword';
import OTPConfirmation from './pages/OTPConfirmation';
import Dashboard from './pages/Dashboard';
import EventForm from './components/Events/EventForm';
import Meetings from './pages/Meetings'
import MyCalender from './components/Calender/MyCalender'
import EventSchedulingView from './components/Events/EventSchedulingView'
import AvailabilityCalendar from './components/Calender/AvailabilityCalendar'
const App = () => {
  const dispatch = useDispatch(); // Initialize useDispatch

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Assuming you want to set the token as the user for now
      dispatch(setUser(token));
    }
  }, [dispatch]); // Dependency array includes dispatch

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm-otp" element={<OTPConfirmation />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/EventForm" element={<EventForm />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/MyCalender" element={<MyCalender />} />
        <Route path="/schedule/:token" element={<EventSchedulingView />} />
        <Route path="/AvailabilityCalendar" element={<AvailabilityCalendar />} />

      </Routes>
    </Router>
  );
};

export default App;
