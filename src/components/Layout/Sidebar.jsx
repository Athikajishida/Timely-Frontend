import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { icon: '+', label: 'Create', href: '/create' },
  { icon: '🔗', label: 'Event types', href: '/dashboard' },
  { icon: '📅', label: 'Meetings', href: '/meetings' },
  { icon: '⏰', label: 'Availability', href: '/availability' },
  { icon: '👥', label: 'Contacts', href: '/contacts' },
  { icon: '🔄', label: 'Workflows', href: '/workflows' },
  { icon: '🔌', label: 'Integrations & apps', href: '/integrations' },
  { icon: '🔀', label: 'Routing', href: '/routing' },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <aside className={`bg-white h-screen border-r border-gray-200 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}>
 <div className="p-4 flex items-center justify-between">
  {isExpanded ? (
    <div className="flex items-center">
      <img src="/logo.svg"  className="h-8" />
      <img src="/timely.svg" alt="Timely" className="h-8" />
    </div>
  ) : (
    <img src="/logo.svg" className="h-8 w-8" />
  )}
  <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
    {isExpanded ? '«' : '»'}
  </button>
</div>


      <nav className="mt-8">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            <span className="mr-3">{item.icon}</span>
            {isExpanded && item.label}
          </Link>
        ))}
      </nav>
      {isExpanded && (
        <div className="absolute bottom-0 w-full p-4">
          <Link
            to="/upgrade"
            className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700"
          >
            Upgrade plan
          </Link>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;