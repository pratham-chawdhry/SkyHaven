import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

export const EditFlightModal = ({ flight, isOpen, onClose, onSave }) => {
  const [editedFlight, setEditedFlight] = useState(flight);

  const handleSave = () => {
    onSave(editedFlight);
  };

  const formatDateTimeForInput = (dateTime) => {
    return new Date(dateTime).toISOString().slice(0, 16);
  };

  const handleDateTimeChange = (field, value) => {
    setEditedFlight((prev) => ({
      ...prev,
      [field]: new Date(value).toISOString()
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Flight Details</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Airline Name</label>
              <input
                type="text"
                value={editedFlight.airlineName}
                onChange={(e) => setEditedFlight((prev) => ({ ...prev, airlineName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
              <input
                type="text"
                value={editedFlight.flightNumber}
                onChange={(e) => setEditedFlight((prev) => ({ ...prev, flightNumber: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
              <input
                type="datetime-local"
                value={formatDateTimeForInput(editedFlight.departureTime)}
                onChange={(e) => handleDateTimeChange('departureTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
              <input
                type="datetime-local"
                value={formatDateTimeForInput(editedFlight.arrivalTime)}
                onChange={(e) => handleDateTimeChange('arrivalTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Departure Airport Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Departure Airport</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['airportName', 'iataCode', 'city', 'country'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type="text"
                    value={editedFlight.airportDeparture[field]}
                    onChange={(e) =>
                      setEditedFlight((prev) => ({
                        ...prev,
                        airportDeparture: { ...prev.airportDeparture, [field]: e.target.value }
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Arrival Airport Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Arrival Airport</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['airportName', 'iataCode', 'city', 'country'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type="text"
                    value={editedFlight.airportArrival[field]}
                    onChange={(e) =>
                      setEditedFlight((prev) => ({
                        ...prev,
                        airportArrival: { ...prev.airportArrival, [field]: e.target.value }
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
