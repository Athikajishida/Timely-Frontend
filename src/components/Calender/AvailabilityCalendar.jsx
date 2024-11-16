import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../store/eventsSlice';

const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AvailabilityCalendar = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  console.log("events:", events);

  const loading = useSelector((state) => state.events.loading);
  const [view, setView] = useState('week');

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Transform events data to match react-big-calendar format
  const transformedEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(event.start_date + 'T' + event.start_time),
    end: new Date(event.end_date + 'T' + event.end_time),
    allDay: event.event_type === 'all_day',
    color: event.color || '#3174ad',
    resourceId: event.user_id
  }));
  console.log("transformedevent:", transformedEvents);
  // Custom event styling
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: 'none',
        display: 'block',
        padding: '2px 5px'
      }
    };
  };

  // Custom toolbar component
  const CustomToolbar = ({ label, onNavigate, onView }) => (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <div className="flex gap-2">
        <button 
          onClick={() => onNavigate('PREV')}
          className="px-3 py-1 bg-gray-700 text-white rounded"
        >
          ←
        </button>
        <button 
          onClick={() => onNavigate('NEXT')}
          className="px-3 py-1 bg-gray-700 text-white rounded"
        >
          →
        </button>
        <button 
          onClick={() => onNavigate('TODAY')}
          className="px-4 py-1 bg-gray-400 text-white rounded ml-2"
        >
          today
        </button>
      </div>
      
      <h2 className="text-xl font-semibold">{label}</h2>
      
      <div className="flex gap-2">
        <button 
          onClick={() => onView('month')}
          className={`px-4 py-1 rounded ${view === 'month' ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
        >
          month
        </button>
        <button 
          onClick={() => onView('week')}
          className={`px-4 py-1 rounded ${view === 'week' ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
        >
          week
        </button>
        <button 
          onClick={() => onView('day')}
          className={`px-4 py-1 rounded ${view === 'day' ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
        >
          day
        </button>
        <button 
          onClick={() => onView('agenda')}
          className={`px-4 py-1 rounded ${view === 'agenda' ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
        >
          list
        </button>
      </div>
    </div>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="h-screen p-4">
            {transformedEvents.length > 0 && (

   <Calendar
  localizer={localizer}
  events={transformedEvents}
  startAccessor="start"
  endAccessor="end"
  resourceIdAccessor="resourceId"
  style={{ height: 'calc(100vh - 2rem)' }}
  eventPropGetter={eventStyleGetter}
  views={['month', 'week', 'day', 'agenda']}
  defaultView="week"
  onView={setView}
  components={{
    toolbar: CustomToolbar
  }}
  className="shadow-lg rounded-lg bg-white"
/>
    )}

    </div>
  );
};

export default AvailabilityCalendar;