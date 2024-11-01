import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import EventTypeCard from '../components/EventTypes/EventTypeCard';
import EventForm from '../components/Events/EventForm';
import { addEvent, fetchEvents } from '../store/eventsSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  // Fetch events from Redux store
  const events = useSelector((state) => state.events.items);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);

  // Fetch events on component mount
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Handle form submission
  const handleEventSubmit = async (eventData) => {
    const formattedData = {
      event: {
        title: eventData.title,
        description: eventData.description,
        event_type: eventData.type,
        location: eventData.location,
        start_date: eventData.dateRange.startDate,
        end_date: eventData.dateRange.endDate,
        start_time: eventData.timeRange.startTime,
        end_time: eventData.timeRange.endTime,
        buffer_time: eventData.bufferTime,
        color: eventData.color,
        platform: eventData.platform,     
        customlink: eventData.customLink,      
        days_available: eventData.daysAvailable,
        participant_emails: eventData.emails || []
      }
    };
    console.log('Formatted data:', formattedData);

    try {
      const result = await dispatch(addEvent(formattedData)).unwrap();
      if (result) {
        setShowForm(false);  // Close form after successful submission
      }
    } catch (err) {
      console.error('Failed to create event:', err);
    }
  };

  // Show loading state while fetching events
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <select className="border-gray-300 rounded-md">
                  <option>My Timely</option>
                </select>
              </div>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setShowForm(true)}
              >
                + New Event Type
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {showForm && (
              <EventForm 
                onClose={() => setShowForm(false)}  // Close form handler
                onSubmit={handleEventSubmit}        // Pass submit handler
              />
            )}

            <div className="flex flex-wrap -mx-4">
              {events && events.length > 0 ? (
                events.map((event) => {
                  // Parse start_time and end_time as Date objects
                  const startTime = new Date(event.start_time);
                  const endTime = new Date(event.end_time);
                  
                  // Calculate the duration in minutes
                  const durationInMinutes = (endTime - startTime) / (1000 * 60); // milliseconds to minutes
                  
                  // Format the duration (for example, 1 hr 30 min)
                  const hours = Math.floor(durationInMinutes / 60);
                  const minutes = durationInMinutes % 60;
                  const duration = `${hours > 0 ? `${hours} hr ` : ''}${minutes > 0 ? `${minutes} min` : ''}` || 'N/A';

                  return (
                    <div className="w-1/3 px-4 mb-6" key={event.id}>
                      <EventTypeCard
                        title={event.title}
                        duration={duration}  /* Use calculated duration here */
                        type={event.event_type}
                        link="#"
                      />
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500 mt-4">No events available</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
