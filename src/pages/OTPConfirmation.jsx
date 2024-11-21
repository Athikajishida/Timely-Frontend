// src/pages/OTPConfirmation.jsx
import React, { useState , useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmOTP } from '../store/authSlice';
import Button from '../components/Button';
import Input from '../components/Input';

const OTPConfirmation = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/signup'); // Redirect if no email is present
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(confirmOTP({ email, otp }));
      console.log('OTP Confirmation Result:', result);
      
      if (!result.error) {
        // Check if we have a token and it was stored
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('OTP confirmation error:', error);
    }
  };

  if (!email) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Confirm Your Email</h2>
        <p className="text-center text-gray-600">
          We've sent an OTP to your email. Please enter it below to confirm your account.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Confirming...' : 'Confirm OTP'}
          </Button>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default OTPConfirmation;