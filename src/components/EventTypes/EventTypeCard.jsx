//src/EventTypes/EventTypeCard.jsx
import React from 'react';

const EventTypeCard = ({ title, duration, type, link }) => {
  return (
    <div className="border border-gray-200 rounded-md p-4 mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{duration}, {type}</p>
      <a href={link} className="text-blue-600 hover:underline text-sm">
        View booking page
      </a>
      <div className="mt-4 flex justify-between items-center">
        <button className="text-gray-600 hover:text-gray-800">
          Copy link
        </button>
        <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
          Share
        </button>
      </div>
    </div>
  );
};

export default EventTypeCard;