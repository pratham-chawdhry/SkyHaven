import React from 'react';
import { FlightCard } from './FlightCard';

export const FlightList = ({ flights, onUpdateFlight }) => {
  if (flights.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">✈️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Flights</h2>
        <p className="text-gray-600">{flights.length} flight{flights.length > 1 ? 's' : ''} found</p>
      </div>

      <div className="space-y-4">
        {flights.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            onUpdate={onUpdateFlight}
          />
        ))}
      </div>
    </div>
  );
};
