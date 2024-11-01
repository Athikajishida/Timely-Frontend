// @file EventForm.js
// @description Form component for creating and managing events in the Timely application. 
//              Fields are mapped to match the backend structure for seamless integration.
// @version 1.0.0
// @date 2024-10-22
// @authors
//  - Athika Jishida

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { addEvent } from '../../store/eventsSlice';

const EventForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'one-on-one',
    emails: [],
    platform:'1',
    customLink: '',
    dateRange: {
      startDate: '',
      endDate: ''
    },
    timeRange: {
      startTime: '09:00',
      endTime: '17:00'
    },
    daysAvailable: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    bufferTime: '15',
    color: '#3366FF'
  });

  const [emailInput, setEmailInput] = useState('');
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState('');

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    // Validate title
    if (name === 'title' && value.trim() === '') {
      newErrors.title = 'Event title is required';
    } else {
      delete newErrors.title;
    }

    // Validate description
    if (name === 'description' && value.trim() === '') {
      newErrors.description = 'Event description is required';
    } else {
      delete newErrors.description;
    }

    // Validate start date
    if (name === 'dateRange.startDate' && value < today) {
      newErrors.startDate = 'Start date cannot be in the past';
    } else {
      delete newErrors.startDate;
    }

    // Validate email format
    if (name === 'emailInput') {
      const emailRegex = /^[^\s@]{3,}@[^\s@]{2,}\.[^\s@]{2,}$/;
      if (!emailRegex.test(value)) {
        newErrors.emailInput = 'Invalid email format (e.g., example@domain.com)';
      } else {
        delete newErrors.emailInput;
      }
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    // Validate start/end dates and times on any changes
    const { startDate, endDate } = formData.dateRange;
    const { startTime, endTime } = formData.timeRange;
    const newErrors = { ...errors };

    if (startDate && endDate && startDate > endDate) {
      newErrors.dateRange = 'End date cannot be before start date';
    } else {
      delete newErrors.dateRange;
    }

    if (startDate === endDate && startTime && endTime) {
      const start = new Date(`2000-01-01T${startTime}`);
      const end = new Date(`2000-01-01T${endTime}`);
      if (start >= end) {
        newErrors.timeRange = 'End time must be after start time';
      } else {
        delete newErrors.timeRange;
      }
    }

    setErrors(newErrors);
  }, [formData.dateRange, formData.timeRange]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('days.')) {
      const day = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        daysAvailable: {
          ...prev.daysAvailable,
          [day]: checked
        }
      }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
      validateField(name, value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
      validateField(name, value);
    }
  };
  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
    setEmailError(''); // Clear error when user starts typing
  };
  const handleEmailAdd = () => {
    const emailRegex = /^[^\s@]{3,}@[^\s@]{2,}\.[^\s@]{2,}$/;
    setEmailError('');
    if (emailInput && emailRegex.test(emailInput)) {
      console.log('Adding email:', emailInput);

      setFormData((prev) => ({
        ...prev,
        emails: [...prev.emails, emailInput],
      }));
      setEmailInput('');
    } else {
      validateField('emailInput', emailInput);
    }

  };

  const handleEmailRemove = (emailToRemove) => {
    setFormData((prev) => ({
      ...prev,
      emails: prev.emails.filter((email) => email !== emailToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      dispatch(addEvent(formData)).then(() => {
        onClose();
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">Create New Event Type</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={(e) => validateField(e.target.name, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="e.g., Sales Call"
                required
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={(e) => validateField(e.target.name, e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="Brief description of the meeting..."
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
              >
                <option value="one-on-one">One-on-One</option>
                <option value="group">Group</option>
              </select>
            </div>

            {/* Email Input Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.type === 'one-on-one' ? 'Participant Email' : 'Participant Emails'}
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={handleEmailInput}
                    // onchange={(e) => setEmailInput(e.target.value)}
                    onBlur={(e) => validateField('emailInput', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                    placeholder="Enter email address"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleEmailAdd();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleEmailAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                {errors.emailInput && <p className="text-red-500 text-sm">{errors.emailInput}</p>}
                {formData.type === 'one-on-one' && formData.emails.length >= 1 && (
                  <p className="text-red-500 text-sm">Only one email allowed for one-on-one events</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {formData.emails.map((email, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <span className="text-sm">{email}</span>
                      <button
                        type="button"
                        onClick={() => handleEmailRemove(email)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Schedule</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="dateRange.startDate"
                  value={formData.dateRange.startDate}
                  onChange={handleChange}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                />
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="dateRange.endDate"
                  value={formData.dateRange.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                />
              </div>
              {errors.dateRange && <p className="text-red-500 text-sm col-span-2">{errors.dateRange}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  name="timeRange.startTime"
                  value={formData.timeRange.startTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  name="timeRange.endTime"
                  value={formData.timeRange.endTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                />
              </div>
              {errors.timeRange && <p className="text-red-500 text-sm col-span-2">{errors.timeRange}</p>}
            </div>
            {/* New Location Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Meeting Platform
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
              >
                <option value="1">Google Meet</option>
                <option value="2">Zoom</option>
                <option value="3">Others</option>
              </select>

              {formData.platform === '3' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Meeting Link
                  </label>
                  <input
                    type="url"
                    name="customLink"
                    value={formData.customLink}
                    onChange={handleChange}
                    placeholder="Enter your meeting link"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Days
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(formData.daysAvailable).map((day) => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`days.${day}`}
                      checked={formData.daysAvailable[day]}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 capitalize">{day}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              disabled={Object.keys(errors).length > 0}
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
