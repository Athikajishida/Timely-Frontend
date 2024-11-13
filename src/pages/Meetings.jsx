import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';

const Meetings = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [dateRange, setDateRange] = useState('');
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title="Meetings" showInviteButton={false} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="p-6 max-w-[1200px] mx-auto">
            

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Calendar Selection */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <button className="w-full text-left px-4 py-2 bg-white border border-gray-300 rounded-md flex items-center justify-between">
                    <span className="text-gray-700">My Calendly</span>
                    <span>▼</span>
                  </button>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    Displaying 0 – 0 of 0 Events
                  </div>
                </div>
              </div>

              {/* Tabs and Filters */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <div className="flex gap-6">
                  <button
                    className={`px-1 py-2 ${selectedTab === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setSelectedTab('upcoming')}
                  >
                    Upcoming
                  </button>
                  <button
                    className={`px-1 py-2 ${selectedTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setSelectedTab('pending')}
                  >
                    Pending
                  </button>
                  <button
                    className={`px-1 py-2 ${selectedTab === 'past' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                    onClick={() => setSelectedTab('past')}
                  >
                    Past
                  </button>
                  <button className="px-1 py-2 text-gray-600 flex items-center gap-1">
                    Date Range <span>▼</span>
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50">
                    Export
                  </button>
                  <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50">
                    Filter
                  </button>
                </div>
              </div>

              {/* Empty State */}
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl text-gray-600 font-medium mb-2">No Events Yet</h3>
                <p className="text-gray-500 mb-6">Share Event Type links to schedule events.</p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  View Event Types
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Meetings;
