import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Plane, Users, Crown } from 'lucide-react';
import { airports } from './data/airports';

const SearchForm = ({
  departure,
  arrival,
  travelers,
  cabinClass,
  onDepartureChange,
  onArrivalChange,
  onTravelersChange,
  onCabinClassChange,
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FormControl fullWidth>
          <InputLabel>From</InputLabel>
          <Select
            value={departure}
            label="From"
            onChange={(e) => onDepartureChange(e.target.value)}
            startAdornment={<Plane className="w-4 h-4 mr-2" />}
          >
            {airports.map((airport) => (
              <MenuItem key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>To</InputLabel>
          <Select
            value={arrival}
            label="To"
            onChange={(e) => onArrivalChange(e.target.value)}
            startAdornment={<Plane className="w-4 h-4 mr-2 rotate-90" />}
          >
            {airports.map((airport) => (
              <MenuItem key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DatePicker 
          label="Departure Date"
          className="w-full"
          disablePast
        />
        <DatePicker 
          label="Return Date"
          className="w-full"
          disablePast
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FormControl fullWidth>
          <InputLabel>Travelers</InputLabel>
          <Select
            value={travelers}
            label="Travelers"
            onChange={(e) => onTravelersChange(e.target.value)}
            startAdornment={<Users className="w-4 h-4 mr-2" />}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <MenuItem key={num} value={num}>
                {num} {num === 1 ? 'Traveler' : 'Travelers'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Cabin Class</InputLabel>
          <Select
            value={cabinClass}
            label="Cabin Class"
            onChange={(e) => onCabinClassChange(e.target.value)}
            startAdornment={<Crown className="w-4 h-4 mr-2" />}
          >
            <MenuItem value="economy">Economy</MenuItem>
            <MenuItem value="premium">Premium Economy</MenuItem>
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="first">First Class</MenuItem>
          </Select>
        </FormControl>
      </div>

      <button className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-[1.02] duration-200 shadow-lg hover:shadow-xl">
        Search Flights
      </button>
    </div>
  );
};

export default SearchForm;
