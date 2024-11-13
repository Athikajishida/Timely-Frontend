import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Clock, Video, User, Loader2 } from 'lucide-react';
import { fetchEventById } from '../../store/eventsSlice';
import { createBooking, clearBookingMessages } from '../../store/bookingsSlice';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Alert, AlertDescription } from '../ui/Alert';

const localizer = momentLocalizer(moment);

const EventSchedulingView = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useParams();
  const dispatch = useDispatch();
  const bookingStatus = useSelector((state) => ({
    loading: state.bookings?.loading || false,
    error: state.bookings?.error || null,
    successMessage: state.bookings?.successMessage || null
  }));
  const event = useSelector((state) => state.events.items.find(e => e.scheduling_link === token));

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (!event) {
      dispatch(fetchEventById(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearBookingMessages());
    };
  }, [dispatch]);

  const generateTimeSlots = (date) => {
    if (!date || !event) return [];
    
    const slots = [];
    const dayOfWeek = moment(date).format('dddd').toLowerCase();
    
    if (!event.days_available?.[dayOfWeek]) {
      return [];
    }

    const startTime = moment(event.start_time).format('HH:mm');
    const endTime = moment(event.end_time).format('HH:mm');
    const bufferTime = event.buffer_time || 15;
    
    let currentTime = moment(startTime, 'HH:mm');
    const endMoment = moment(endTime, 'HH:mm');

    while (currentTime.isBefore(endMoment)) {
      slots.push(currentTime.format('HH:mm'));
      currentTime.add(bufferTime, 'minutes');
    }

    return slots;
  };

  useEffect(() => {
    if (selectedDate && event) {
      setAvailableSlots(generateTimeSlots(selectedDate));
    }
  }, [selectedDate, event]);

  const isDateInRange = (date) => {
    if (!event?.start_date || !event?.end_date) return false;
    return moment(date).isBetween(
      moment(event.start_date).startOf('day'),
      moment(event.end_date).endOf('day'),
      'day',
      '[]'
    );
  };

  const customDayPropGetter = (date) => {
    if (!event?.days_available) return {};
    
    const dayOfWeek = moment(date).format('dddd').toLowerCase();
    const isAvailable = event.days_available[dayOfWeek] && isDateInRange(date);
    
    if (!isAvailable) {
      return {
        className: 'unavailable-day',
        style: {
          backgroundColor: '#f3f4f6',
          cursor: 'not-allowed',
          opacity: 0.5
        }
      };
    }
    
    if (isDateInRange(date)) {
      return {
        style: {
          backgroundColor: '#EEF2FF',
          border: '1px solid #3366FF',
          borderRadius: '4px'
        }
      };
    }
    
    return {};
  };

  const handleConfirmSchedule = async () => {
    if (!selectedDate || !selectedTime) return;

    const scheduledDateTime = moment(selectedDate)
      .format('YYYY-MM-DD') + ' ' + selectedTime;
      
    try {
      setIsLoading(true);
      await dispatch(createBooking({
        eventId: event.id,
        scheduledTime: scheduledDateTime
      }));
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  const renderBookingConfirmation = () => (
    <div className="mt-4 bg-white rounded-lg border shadow-sm p-4">
      <div className="border-b pb-2 mb-3">
        <h3 className="text-lg font-semibold">Selected Time</h3>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-medium">
          {moment(selectedDate).format('dddd, MMMM D, YYYY')}
        </p>
        <p className="text-gray-600">
          {moment(selectedTime, 'HH:mm').format('h:mm A')}
        </p>
        
        {bookingStatus.error && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>
              {Array.isArray(bookingStatus.error) 
                ? bookingStatus.error.join(', ') 
                : bookingStatus.error}
            </AlertDescription>
          </Alert>
        )}
        
        {bookingStatus.successMessage && (
          <Alert className="mt-2 bg-green-50 text-green-700 border-green-200">
            <AlertDescription>{bookingStatus.successMessage}</AlertDescription>
          </Alert>
        )}

        <button 
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          onClick={handleConfirmSchedule}
          disabled={bookingStatus.loading}
        >
          {bookingStatus.loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Confirming...
            </>
          ) : (
            'Confirm Schedule'
          )}
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading event details...</p>
      </div>
    );
  }

  if (!isLoading && !event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-600">Event not found</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Event Details */}
      <div className="w-1/4 p-6 bg-white border-r">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
            <p className="text-gray-600 mt-2">{event.description}</p>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>{event.buffer_time} minutes</span>
          </div>

          {event.platform && (
            <div className="flex items-center space-x-2 text-gray-600">
              <Video className="w-5 h-5" />
              <span>
                {event.platform === '1' ? 'Google Meet' : 
                 event.platform === '2' ? 'Zoom' : 'Custom Link'}
              </span>
            </div>
          )}

          {selectedDate && selectedTime && renderBookingConfirmation()}
        </div>
      </div>

      {/* Center - Calendar */}
      <div className="w-1/2 p-6">
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectSlot={({ start }) => {
            const dayOfWeek = moment(start).format('dddd').toLowerCase();
            if (event.days_available[dayOfWeek] && isDateInRange(start)) {
              setSelectedDate(start);
              setSelectedTime(null);
            }
          }}
          dayPropGetter={customDayPropGetter}
          views={['month']}
          defaultView="month"
          min={moment(event.start_date).toDate()}
          max={moment(event.end_date).toDate()}
        />
      </div>

      {/* Right side - Time Slots */}
      <div className="w-1/4 p-6 bg-white border-l">
        <h3 className="text-lg font-medium mb-4">
          {selectedDate 
            ? `Available Times for ${moment(selectedDate).format('MMM D, YYYY')}` 
            : 'Select a date to view available times'}
        </h3>
        {selectedDate && availableSlots.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {availableSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`w-full text-left py-2 px-4 rounded-lg ${selectedTime === time ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              >
                {moment(time, 'HH:mm').format('h:mm A')}
              </button>
            ))}
          </div>
        ) : (
          <p>No available slots for this date.</p>
        )}
      </div>
    </div>
  );
};

export default EventSchedulingView;
