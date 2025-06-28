// src/components/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useGlobalContext } from '../context';

export const SearchBar = ({ onSearch }) => {
  const { getAirports } = useGlobalContext();

  const [airports, setAirports] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');

  useEffect(() => {
    getAirports()
      .then(data => setAirports(data))
      .catch(err => console.error('Failed fetching airports', err));
  }, [getAirports]);

  const handleSearch = () => {
    onSearch({ from, to, departure, passengerCount, travelClass });
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-6">Find Your Next Flight</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Departure</option>
                  {airports.map(a => (
                    <option key={a.airport_id} value={a.iataCode}>
                      {a.city} ({a.iataCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select
                  value={to}
                  onChange={e => setTo(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Destination</option>
                  {airports.map(a => (
                    <option key={a.airport_id} value={a.iataCode}>
                      {a.city} ({a.iataCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Departure Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={departure}
                  onChange={e => setDeparture(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Passengers */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
                  className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg"
                >
                  −
                </button>
                <span className="text-sm font-medium text-gray-800">
                  {passengerCount} {passengerCount === 1 ? 'Adult' : 'Adults'}
                </span>
                <button
                  onClick={() => setPassengerCount(passengerCount + 1)}
                  className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 items-end">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ECO">Economy (ECO)</option>
                <option value="PRE">Premium Economy (PRE)</option>
                <option value="BUS">Business (BUS)</option>
                <option value="FIR">First (FIR)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200 flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                Search Flights
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
