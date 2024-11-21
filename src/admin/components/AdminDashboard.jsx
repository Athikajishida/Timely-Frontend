import React, { useState } from 'react';
import { Users, Calendar, BookOpen, Edit, Trash2, Ban, Check } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/Alert';

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 flex items-center gap-2 rounded-lg transition-colors
      ${active 
        ? 'bg-blue-500 text-white' 
        : 'bg-white text-gray-600 hover:bg-gray-50'}`}
  >
    {children}
  </button>
);

const Table = ({ children, className = '' }) => (
  <div className={`w-full overflow-x-auto ${className}`}>
    <table className="w-full border-collapse">
      {children}
    </table>
  </div>
);

const Th = ({ children, className = '' }) => (
  <th className={`text-left p-4 bg-gray-50 border-b text-gray-600 font-medium ${className}`}>
    {children}
  </th>
);

const Td = ({ children, className = '' }) => (
  <td className={`p-4 border-b border-gray-100 ${className}`}>
    {children}
  </td>
);

const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  onClick, 
  className = '' 
}) => {
  const variants = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    success: 'bg-green-500 text-white hover:bg-green-600'
  };

  const sizes = {
    default: 'px-4 py-2',
    sm: 'px-2 py-1 text-sm'
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${variants[variant]} 
        ${sizes[size]}
        rounded-lg transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`${variants[variant]} text-xs px-2 py-1 rounded-full`}>
      {children}
    </span>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleAction = (action, item) => {
    setConfirmAction({ action, item });
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    if (confirmAction) {
      // Handle the action here
      console.log('Executing action:', confirmAction);
    }
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b pb-4">
        <TabButton 
          active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} />
          Users
        </TabButton>
        <TabButton 
          active={activeTab === 'events'} 
          onClick={() => setActiveTab('events')}
        >
          <Calendar size={18} />
          Events
        </TabButton>
        <TabButton 
          active={activeTab === 'bookings'} 
          onClick={() => setActiveTab('bookings')}
        >
          <BookOpen size={18} />
          Bookings
        </TabButton>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'users' && (
          <div>
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Users Management</h2>
            </div>
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>John Doe</Td>
                  <Td>john@example.com</Td>
                  <Td><Badge variant="success">Active</Badge></Td>
                  <Td>
                    <div className="flex gap-2">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleAction('blockUser', { id: 1 })}
                      >
                        <Ban size={16} className="mr-1" />
                        Block
                      </Button>
                    </div>
                  </Td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Events Management</h2>
            </div>
            <Table>
              <thead>
                <tr>
                  <Th>Event Name</Th>
                  <Th>Owner</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>Team Meeting</Td>
                  <Td>john@example.com</Td>
                  <Td><Badge>One-on-One</Badge></Td>
                  <Td><Badge variant="success">Active</Badge></Td>
                  <Td>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('editEvent', { id: 1 })}
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleAction('cancelEvent', { id: 1 })}
                      >
                        <Trash2 size={16} className="mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </Td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Bookings Management</h2>
            </div>
            <Table>
              <thead>
                <tr>
                  <Th>Event</Th>
                  <Th>User</Th>
                  <Th>Scheduled Time</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>Team Meeting</Td>
                  <Td>jane@example.com</Td>
                  <Td>2024-11-21 10:00 AM</Td>
                  <Td><Badge variant="success">Confirmed</Badge></Td>
                  <Td>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleAction('cancelBooking', { id: 1 })}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Cancel
                    </Button>
                  </Td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Confirm Action</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to {confirmAction?.action}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;