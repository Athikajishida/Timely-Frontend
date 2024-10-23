import React from 'react';
import { Copy, Share2, Settings } from 'lucide-react';

const EventTypeCard = ({ title, duration, type, link }) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-200">
      {/* Purple top border line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600"></div>
      
      {/* Main content */}
      <div className="p-6">
        {/* Header with settings */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-600">
              {duration}, {type}
            </p>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <Settings size={20} />
          </button>
        </div>

        {/* View booking link */}
        <a 
          href={link} 
          className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-block mb-6"
        >
          View booking page
        </a>

        {/* Avatar and actions */}
        <div className="flex justify-between items-center mt-4">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">A</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
              <Copy size={16} />
              <span>Copy link</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-all duration-200 text-sm font-medium">
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTypeCard;