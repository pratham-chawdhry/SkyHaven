import React from 'react';
import DestinationCard from './DestinationCard';
import { destinations } from '../data/destination';

const PopularDestinations = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map((destination) => (
          <DestinationCard key={destination.city} {...destination} />
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;