import React, { useState,useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaChevronLeft } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const events = [];

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
  };

  const timeSlots = [
    '9:00am', '9:30am', '10:00am', '10:30am', '11:00am',
    '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm'
  ];

  const customDayPropGetter = date => {
    const today = moment().startOf('day');
    const selected = selectedDate ? moment(selectedDate).startOf('day') : null;
    
    if (selected && date.getTime() === selected.valueOf()) {
      return {
        className: 'selected-date',
        style: {
          backgroundColor: '#eef3fe',
        }
      };
    }
    return {};
  };

  return (
    <div className="flex flex-col items-center bg-white">
      {/* Navbar */}
      <div className="w-full flex items-center justify-between p-4 bg-white border-b">
        <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
          <FaChevronLeft size={18} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">dummy</h1>
        <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
          <FiMoreHorizontal size={20} />
        </button>
      </div>

      {/* Main Calendar and Time Selection Section */}
      <div className="flex justify-center w-full mt-4 px-8">
        {/* Calendar Component */}
        <div className="w-1/2 pr-8">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            defaultView="month"
            dayPropGetter={customDayPropGetter}
            className="h-[500px] custom-calendar"
            components={{
              toolbar: CustomToolbar
            }}
          />
        </div>

        {/* Time Selection Component */}
        <div className="w-1/3">
          <h3 className="text-2xl font-medium text-gray-800">Select a Date & Time</h3>
          {selectedDate && (
            <div>
              <h4 className="text-xl font-medium text-gray-700 mb-4">
                {moment(selectedDate).format('dddd, MMMM D')}
              </h4>
              <div className="max-h-[300px] overflow-y-auto">
                {timeSlots.map((time, index) => (
                  <button
                    key={index}
                    className="block w-full px-4 py-3 mb-2 text-center text-blue-600 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .custom-calendar {
          border: none !important;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .custom-calendar .rbc-today {
          background-color: #e8f0fe !important;
        }
        .custom-calendar .rbc-off-range-bg {
          background-color: transparent !important;
        }
        .custom-calendar .rbc-off-range {
          color: #70757a !important;
        }
        .custom-calendar .rbc-header {
          padding: 8px 0;
          font-weight: 500;
          color: #70757a;
        }
        .custom-calendar .rbc-date-cell {
          padding: 8px;
          text-align: center;
          cursor: pointer;
        }
        .custom-calendar .rbc-date-cell:hover {
          background-color: #eef3fe;
          color: #1a73e8;
        }
        .custom-calendar .selected-date {
          color: #1a73e8;
          font-weight: 500;
        }
        .custom-calendar .rbc-month-view {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
        }
        .custom-calendar .rbc-day-bg {
          transition: background-color 0.2s ease;
        }
        .custom-calendar .rbc-day-bg:hover {
          background-color: #eef3fe !important;
        }
        .custom-calendar .rbc-selected-cell {
          background-color: #eef3fe !important;
        }
        .custom-calendar .rbc-current {
          color: #1a73e8;
        }
      `}</style>
    </div>
  );
};

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-medium">
          {moment(toolbar.date).format('MMMM YYYY')}
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={goToBack}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default MyCalendar;