import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice'; 

const Header = ({ title, showInviteButton }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
      <h1 className="text-2xl font-bold">{title || 'Event Types'}</h1>
      <div className="flex items-center space-x-4">
        {showInviteButton && (
          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md">
            Invite user
          </button>
        )}
        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center space-x-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center">
              {user?.name?.[0] || 'A'}
            </div>
            <span className={`transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`}>▼</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg p-2">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="font-semibold">{user?.name || 'Athika Jishida'}</p>
                <p className="text-sm text-gray-500">Teams free trial <span className="text-blue-600">Upgrade</span></p>
                <p className="text-sm font-semibold text-gray-700">6 DAYS LEFT</p>
              </div>
              <a className="block px-4 py-2 text-sm hover:bg-gray-100" href="/profile">Profile</a>
              <a className="block px-4 py-2 text-sm hover:bg-gray-100" href="/branding">Branding</a>
              <a className="block px-4 py-2 text-sm hover:bg-gray-100" href="/my-link">My Link</a>
              <button 
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
