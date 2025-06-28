import React, { useState } from 'react';
import { Plane, Clock, Edit2, CheckCircle } from 'lucide-react';
import { EditFlightModal } from './EditFlightModal';

export const FlightCard = ({ flight, onUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDuration = () => {
    const departure = new Date(flight.departureTime);
    const arrival = new Date(flight.arrivalTime);
    const diffMs = arrival.getTime() - departure.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleSave = (updatedFlight) => {
    onUpdate(updatedFlight);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Plane className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{flight.airlineName}</h3>
              <p className="text-sm text-gray-500">{flight.flightNumber}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatTime(flight.departureTime)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {formatDate(flight.departureTime)}
            </div>
            <div className="text-lg font-semibold text-gray-700 mt-2">
              {flight.airportDeparture.iataCode}
            </div>
            <div className="text-sm text-gray-500">
              {flight.airportDeparture.city}, {flight.airportDeparture.country}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="h-px bg-gray-300 flex-1"></div>
              <Plane className="h-4 w-4 text-gray-400 mx-2 transform rotate-90" />
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
              <Clock className="h-3 w-3" />
              {calculateDuration()}
            </div>
            <div className="text-xs text-gray-400 mt-1">Direct</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatTime(flight.arrivalTime)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {formatDate(flight.arrivalTime)}
            </div>
            <div className="text-lg font-semibold text-gray-700 mt-2">
              {flight.airportArrival.iataCode}
            </div>
            <div className="text-sm text-gray-500">
              {flight.airportArrival.city}, {flight.airportArrival.country}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Available</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200">
              Select Flight
            </button>
          </div>
        </div>
      </div>

      <EditFlightModal
        flight={flight}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};
