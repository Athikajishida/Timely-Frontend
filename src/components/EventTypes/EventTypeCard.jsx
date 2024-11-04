import React, { useState, useRef, useEffect } from 'react';
import { Copy, Share2, Settings } from 'lucide-react';

const EventTypeCard = ({ eventId, title, duration, type, link, onEdit, onDelete }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEditClick = () => {
    onEdit(eventId);
    setIsDropdownOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete(eventId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative rounded-lg overflow-visible shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-200">
      <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-600">
              {duration}, {type}
            </p>
          </div>
          <div className="relative">
            <button 
              ref={buttonRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Settings size={20} />
            </button>
            {isDropdownOpen && (
              <div 
                ref={dropdownRef}
                className="absolute top-full right-0 mt-1 bg-white border rounded-lg shadow-lg w-36 py-1 z-50"
              >
                <button 
                  onClick={handleEditClick} 
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={handleDeleteClick} 
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <a href={link} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-block mb-6">
          View booking page
        </a>
        <div className="flex justify-between items-center mt-4">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">A</span>
          </div>
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