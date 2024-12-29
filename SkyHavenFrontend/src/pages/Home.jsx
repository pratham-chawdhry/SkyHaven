import React, { useState } from 'react';

import Features from '../components/Features';
import Testimonials from '../components/testimonials/Testimonial';
import PopularDestinations from '../components/destinations/PopularDestinations';
import SearchForm from '../components/SearchForm';

const Home = () => {
  const [departure, setDeparture] = useState('JFK');
  const [arrival, setArrival] = useState('LAX');
  const [travelers, setTravelers] = useState('1');
  const [cabinClass, setCabinClass] = useState('economy');

  return (
    <div>
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
            height: '600px',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto pt-24 px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Journey Begins Here
            </h1>
            <p className="text-xl text-white/90">
              Find and book your perfect flight to anywhere in the world
            </p>
          </div>
          <SearchForm
            departure={departure}
            arrival={arrival}
            travelers={travelers}
            cabinClass={cabinClass}
            onDepartureChange={setDeparture}
            onArrivalChange={setArrival}
            onTravelersChange={setTravelers}
            onCabinClassChange={setCabinClass}
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <Features />
        </div>
        <PopularDestinations />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
