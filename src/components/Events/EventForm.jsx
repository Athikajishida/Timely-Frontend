import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { addEvent } from '../../store/eventsSlice';

const EventForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'one-on-one',
    emails: [],
    location: 'google_meet',
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

  // Validate dates and times
  useEffect(() => {
    const validateDatesAndTimes = () => {
      const newErrors = {};
      const { startDate, endDate } = formData.dateRange;
      const { startTime, endTime } = formData.timeRange;

      if (startDate && endDate && startDate > endDate) {
        newErrors.dateRange = 'End date cannot be before start date';
      }

      if (startDate === endDate && startTime && endTime) {
        const start = new Date(`2000-01-01T${startTime}`);
        const end = new Date(`2000-01-01T${endTime}`);
        if (start >= end) {
          newErrors.timeRange = 'End time must be after start time';
        }
      }

      setErrors(newErrors);
    };

    validateDatesAndTimes();
  }, [formData.dateRange, formData.timeRange]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('days.')) {
      const day = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        daysAvailable: {
          ...prev.daysAvailable,
          [day]: checked
        }
      }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEmailAdd = () => {
    if (emailInput && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setFormData(prev => ({
        ...prev,
        emails: [...prev.emails, emailInput]
      }));
      setEmailInput('');
    }
  };

  const handleEmailRemove = (emailToRemove) => {
    setFormData(prev => ({
      ...prev,
      emails: prev.emails.filter(email => email !== emailToRemove)
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="e.g., Sales Call"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                placeholder="Brief description of the meeting..."
              />
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
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                  <button
                    type="button"
                    onClick={handleEmailAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                />
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
              {errors.dateRange && (
                <p className="text-red-500 text-sm col-span-2">{errors.dateRange}</p>
              )}
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
              {errors.timeRange && (
                <p className="text-red-500 text-sm col-span-2">{errors.timeRange}</p>
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